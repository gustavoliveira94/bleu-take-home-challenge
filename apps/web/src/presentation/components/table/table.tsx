import { Loader2 } from 'lucide-react';

interface TableProps {
  columns: string[];
  rows: (string | number)[][];
  noData?: string;
  loading?: boolean;
}

export const Table: React.FC<TableProps> = ({
  columns,
  rows,
  loading,
  noData = 'There are no data.',
}) => {
  return (
    <div className="overflow-auto rounded-lg border border-foreground/10" data-testid="table">
      <table
        className={`min-w-full ${loading ? 'min-h-[120px]' : ''} text-sm text-left text-foreground`}
      >
        <thead className="bg-primary text-primary-foreground">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-3 whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-background divide-y divide-foreground/5">
          {loading ? (
            <tr data-testid="loading">
              <td colSpan={columns.length}>
                <Loader2 color="#ff0420" className="w-12 h-12 animate-1 animate-spin mx-auto" />
              </td>
            </tr>
          ) : null}

          {rows.length === 0 && !loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center px-4 py-5 text-foreground/50">
                {noData}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-2 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
