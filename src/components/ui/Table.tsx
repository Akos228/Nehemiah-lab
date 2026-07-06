import React from 'react';

interface TableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
  }[];
  children?: (item: T) => React.ReactNode;
}

export function Table<T extends { id: string | number }>({ data, columns, children }: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto border border-pure-black/10 rounded-xl bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-pure-black text-pure-white">
            {columns.map((col, idx) => (
              <th 
                key={idx} 
                className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
            {children && <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-pure-black/5">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (children ? 1 : 0)} className="px-6 py-12 text-center text-pure-black/40 text-sm">
                Aucune donnée disponible
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-pure-black/[0.02] transition-colors group">
                {columns.map((col, idx) => (
                  <td key={idx} className={`px-6 py-4 text-sm ${col.className || ''}`}>
                    {typeof col.accessor === 'function' 
                      ? col.accessor(item) 
                      : (item[col.accessor] as React.ReactNode)}
                  </td>
                ))}
                {children && (
                  <td className="px-6 py-4 text-right">
                    {children(item)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}