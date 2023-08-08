import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import EntryCard from "src/components/entries/EntryCard";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import { Link } from "react-router-dom";

/** EntriesList
 *
 * Props: entries: [{id, title, description, body, created_at, updated_at}, ...]
 *
 * State: isLoading: boolean
 *
 * App -> CollectionDetail -> EntriesList -> EntryCard
 *
*/

function EntriesList({ entries }) {

  const navigate = useNavigate();

  const data = useMemo(() => entries, []);

  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Date posted',
      accessorKey: 'date_posted',
    },
    {
      header: 'Title (Arabic)',
      accessorKey: 'title',
    },
    {
      header: 'Title (translated)',
      accessorKey: 'title_translated',
    },
    {
      header: 'Full text (Arabic)',
      accessorKey: 'full_text',
    },
    {
      header: 'Full text (translated)',
      accessorKey: 'full_text_translated',
    },
    {
      header: 'AI summary',
      accessorKey: 'ai_summary',
    }
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel()
  });


  return (
    <div className="EntriesList overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th scope="col" className="px6 py-4" key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (

            <tr
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              key={row.id}
              onClick={() => navigate(`/entries/${row.getValue("id")}`)}
            >
              {row.getVisibleCells().map(cell => (
                <td className="px-6 py-4" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>

          ))}
        </tbody>

      </table>
      {/* <div className="EntriesList-List">
        {entries.map(e => (
          <EntryCard
            key={e.id}
            id={e.id}
            date_posted={e.date_posted}
            publication={e.publication}
            title={e.title}
            title_translated={e.title_translated}
            full_text={e.full_text}
            full_text_translated={e.full_text_translated}
            ai_summary={e.ai_summary}
            link={e.link}
          />
        ))}
      </div> */}
    </div>
  );

}

export default EntriesList;