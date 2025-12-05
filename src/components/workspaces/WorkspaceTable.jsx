/* eslint-disable react/prop-types */
export default function WorkspaceTable({
  workspaces,
  isLoading,
  onRowClick,
}) {
  return (
    <div className="border rounded-lg overflow-hidden bg-background">
      <table className="min-w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-2 text-left font-medium">Name</th>
            <th className="px-4 py-2 text-left font-medium">Created</th>
            <th className="px-4 py-2 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <LoadingRows />
          ) : workspaces.length === 0 ? (
            <EmptyRow />
          ) : (
            workspaces.map((ws) => (
              <tr
                key={ws.id}
                className="border-t hover:bg-muted/60 cursor-pointer"
                onClick={() => onRowClick?.(ws)}
              >
                <td className="px-4 py-2">{ws.name}</td>
                <td className="px-4 py-2">
                  {ws.createdAt
                    ? new Date(ws.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    type="button"
                    className="text-xs px-3 py-1 rounded border hover:bg-accent"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRowClick?.(ws);
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function LoadingRows() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <tr key={i} className="border-t">
          <td className="px-4 py-3">
            <div className="h-4 w-40 animate-pulse rounded bg-muted" />
          </td>
          <td className="px-4 py-3">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          </td>
          <td className="px-4 py-3 text-right">
            <div className="h-4 w-16 animate-pulse rounded bg-muted inline-block" />
          </td>
        </tr>
      ))}
    </>
  );
}

function EmptyRow() {
  return (
    <tr className="border-t">
      <td colSpan={3} className="px-4 py-6 text-center text-muted-foreground">
        No workspaces yet. Create your first one.
      </td>
    </tr>
  );
}
