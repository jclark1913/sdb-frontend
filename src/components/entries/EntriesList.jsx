import React, { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EntryCard from "src/components/entries/EntryCard";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import { columns } from "./EntryTableColumns";

/** EntriesList
 *
 * Props:
 *  - onSelectionChange: function defined in CollectionDetail to handle entry selection
 *  - entries: array of entry objects from API
 *
 * State:
 *  - columnVisibility: used to show/hide columns
 *  - rowSelection: used to track selected rows
 *  - sorting: used to track sorting
 *
 * Memoized state:
 *  - data: Will refresh whenever entries prop changes
 *
 * Refs:
 *  - selectedColumns: used to track selected columns and update ref in CollectionDetail
 *
 * App -> CollectionDetail -> EntriesList -> EntryCard
 *
 *
*/

function EntriesList({ onSelectionChange, entries }) {

  const navigate = useNavigate();
  const data = useMemo(() => entries, []);

  // The states are bound to the tanstack table below
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState([]);

  // This ref is used to track selected columns in EntriesList
  const selectedColumns = useRef([]);

  // This first updates the ref in EntriesList, then calls the onSelectionChange
  // function in CollectionDetail to update the state there
  const getIdsFromSelectedColumns = () => {
    selectedColumns.current = table.getSelectedRowModel().flatRows.map((row) => { return row.original.id; });
    console.log('EntriesList > getIdsFromSelectedColumns > selectedColumns.current: ', selectedColumns.current);
    onSelectionChange(selectedColumns.current);
  };

  // Tanstack table logic
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      rowSelection: rowSelection,
      sorting: sorting,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
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
        {table.getAllLeafColumns().map((column, idx) => {
          if (idx !== 0) {
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
          }
        })}
      </div>
      {/* ^ TOGGLE COLUMN VISIBILITY ^ */}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {table.getHeaderGroups().map((headerGroup, idx) => (
            <tr key={headerGroup.id}>

              {headerGroup.headers.map(header => (
                <th
                  scope="col"
                  className="px-6 py-4"
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}{...{
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
                  {
                    { asc: " (asc)", desc: " (desc)" }[
                    header.column.getIsSorted() ?? null
                    ]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* ^ RENDER TABLE HEADERS - INCLUDES SORTING LOGIC^ */}
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
        {/* ^ RENDER TABLE BODY ^ */}

      </table>
      {/* I can't help but feel there's a better way to do this, but it works. */}
      <div>{selectedColumns.current = getIdsFromSelectedColumns()}</div>
    </div>
  );

}

export default EntriesList;