// scripts/convert-alias-to-relative.js
// Node 16+
// Usage:
// 1) git add & commit your work (highly recommended).
// 2) node scripts/convert-alias-to-relative.js --dry
//    Inspect output. If looks good:
// 3) node scripts/convert-alias-to-relative.js
//
// The script will create .bak copies of modified files.

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');

const DRY = process.argv.includes('--dry');

if (!fs.existsSync(SRC)) {
  console.error('Error: src/ directory not found in', ROOT);
  process.exit(1);
}

const pattern = `${SRC}/**/*.{js,jsx,ts,tsx}`;
const files = glob.sync(pattern, { nodir: true, ignore: ['**/node_modules/**', '**/*.bak'] });

const importRegex = /((?:import\s.+?\sfrom\s|require\()\s*)(['"`])@\/([^'"`]+)\2/gm;
// captures:
// group1 = the prefix (import ... from  OR require(
// group2 = quote char
// group3 = path inside @/...

function toPosix(p) {
  return p.split(path.sep).join('/');
}

let changedFiles = [];

files.forEach((file) => {
  const text = fs.readFileSync(file, 'utf8');
  let has = false;
  const newText = text.replace(importRegex, (match, pfx, quote, rest) => {
    // rest is like services/projectService or components/X
    // compute relative path from file to SRC/rest
    const targetAbsolute = path.join(SRC, rest);
    // relative path from file directory to targetAbsolute
    let rel = path.relative(path.dirname(file), targetAbsolute);
    // convert windows separators to posix for import paths
    rel = toPosix(rel);
    // If rel doesn't start with . then make it ./...
    if (!rel.startsWith('.') && !rel.startsWith('/')) rel = './' + rel;
    // Keep the same quote char and original prefix
    has = true;
    // return replacement preserving the prefix (import or require)
    return `${pfx}${quote}${rel}${quote}`;
  });

  if (has && newText !== text) {
    changedFiles.push(file);
    if (DRY) {
      console.log('[DRY] Would update:', path.relative(ROOT, file));
    } else {
      // backup
      fs.writeFileSync(file + '.bak', text, 'utf8');
      fs.writeFileSync(file, newText, 'utf8');
      console.log('Updated:', path.relative(ROOT, file), ' (backup at .bak)');
    }
  }
});

if (changedFiles.length === 0) {
  console.log('No alias imports found. Nothing to change.');
} else {
  if (DRY) {
    console.log(`\nDRY RUN complete — ${changedFiles.length} files would be changed.`);
    console.log('Run without --dry to actually apply changes.');
  } else {
    console.log(`\nApplied changes to ${changedFiles.length} files. Backups created with .bak extension.`);
    console.log('Review, run tests, then git add & commit.');
  }
}
