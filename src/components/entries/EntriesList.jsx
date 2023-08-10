import React, { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EntryCard from "src/components/entries/EntryCard";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import IndeterminateCheckbox from "./IndeterminateCheckbox";

/** EntriesList
 *
 * Props: entries: [{id, title, description, body, created_at, updated_at}, ...]
 *
 * State: isLoading: boolean
 *
 * App -> CollectionDetail -> EntriesList -> EntryCard
 *
*/

function EntriesList({ onSelectionChange, entries }) {

  const navigate = useNavigate();

  const data = useMemo(() => entries, []);

  const [columnVisibility, setColumnVisibility] = React.useState({});

  const [rowSelection, setRowSelection] = React.useState({});

  // const ColumnResizeMode = 'onChange';

  const columnHelper = createColumnHelper();

  const selectedColumns = useRef([]);

  const getIdsFromSelectedColumns = () => {
    console.log('selectedColumns.current', selectedColumns.current)
    selectedColumns.current = table.getSelectedRowModel().flatRows.map((row) => {return row.original.id});
    onSelectionChange(selectedColumns.current);
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
    },
    columnHelper.accessor("id", {
      header: "ID",
    }),
    // {
    //   header: 'ID',
    //   accessorKey: 'id',
    //   maxSize: 1,
    //   size: 1,
    // },
    {
      header: 'Date posted',
      accessorKey: 'date_posted',
      maxSize: 1,
    },
    {
      header: 'Publication',
      accessorKey: 'publication',
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
      header: 'AI summary',
      accessorKey: 'ai_summary',
    },
    {
      header: 'Full text (Arabic)',
      accessorKey: 'full_text',
    },
    {
      header: 'Full text (translated)',
      accessorKey: 'full_text_translated',
    },
  ];

  const finalColumnDef = useMemo(() => {columns, []});

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      rowSelection: rowSelection,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    // getPaginationRowModel: getPaginationRowModel()
  });


  return (
    <div className="EntriesList overflow-x-auto">
      <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">Selected: {table.getSelectedRowModel().rows.length} of {table.getCoreRowModel().rows.length}</div>
      <div className="flex flex-row gap-1 text-xs text-gray-700 rounded-md border p-4">
        <label>
          <input {...{
            type: "checkbox",
            checked: table.getIsAllColumnsVisible(),
            onChange: table.getToggleAllColumnsVisibilityHandler(),
            style: { marginRight: 8, textAlign: 'center' },
          }}
          /> {' '}
          <span className="font-bold">Show/hide all</span>
        </label>
        {table.getAllLeafColumns().map(column => {
          return (
            <div key={column.id} className="px-1">
              <label>
                <input
                  {...{
                    type: 'checkbox',
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                    style: { marginRight: 8, textAlign: 'center' },
                  }}
                />{' '}
                <span>{column.id}</span>
              </label>
            </div>
          );
        })}
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th scope="col" className="px-6 py-4" key={header.id} colSpan={header.colSpan} {...{
                  style: {
                    width: header.getSize()
                  },
                }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
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
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-100 hover:cursor-pointer"
              key={row.id}
            >
              {row.getVisibleCells().map((cell, idx) => (
                <td
                  className="px-6 py-4"
                  key={cell.id}
                  onClick={idx !== 0 ? () => navigate(`/entries/${row.getValue("id")}`) : null}>
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
      <div>{selectedColumns.current = getIdsFromSelectedColumns()}</div>
    </div>
  );

}

export default EntriesList;