import React, { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EntryCard from "./EntryCard.tsx";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import IndeterminateCheckbox from "./IndeterminateCheckbox.tsx";
import { columns } from "src/components/entries/EntryTableColumns.tsx";
import { SortingState } from "@tanstack/react-table";
import { EntriesListProps } from "src/types/globalTypes";

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
 * Refs:
 *  - selectedColumns: used to track selected columns and update ref in CollectionDetail
 *
 * App -> CollectionDetail -> EntriesList -> EntryCard
 *
*/

const EntriesList: React.FC<EntriesListProps> = ({ onSelectionChange, entries }) => {

  const navigate = useNavigate();

  // NOTE: Memoization is causing re-render issues and may or may not be incorporated in the future
  // const data = useMemo(() => entries, []);
  const data = entries;

  // These states are bound to the tanstack table below
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // This ref is used to track selected columns in EntriesList
  const selectedColumns = useRef<any[]>([]);

  // This first updates the ref in EntriesList, then calls the onSelectionChange
  // function in CollectionDetail to update the state there
  const getIdsFromSelectedColumns = () => {
    selectedColumns.current = table.getSelectedRowModel().flatRows.map((row) => { return row.original.id; });
    console.log('EntriesList > getIdsFromSelectedColumns > selectedColumns.current: ', selectedColumns.current);
    onSelectionChange(selectedColumns.current);
  };

  useEffect(() => {
    getIdsFromSelectedColumns();
  }, []);

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
    getPaginationRowModel: getPaginationRowModel()
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
                    header.column.getIsSorted() ? 'asc' : 'desc'
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
                  onClick={idx !== 0 ? () => navigate(`/entries/${row.original.id}`) : undefined}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>

          ))}
        </tbody>
        {/* ^ RENDER TABLE BODY ^ */}

      </table>
      <div className="flex flex-row gap-1">
        <button
          className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border max-h-10"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border max-h-10"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border max-h-10"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium border max-h-10"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <div className="flex flex-row gap-1">
          <span className="text-sm text-gray-700 dark:text-gray-400 flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
          </span>
          <span className="text-sm text-gray-700 dark:text-gray-400 flex items-center gap-1">
            <div>| Go to page</div>
            <input
              className="w-10 text-center border rounded-md"
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
          </span>
          <select
            className="text-sm text-gray-700 dark:text-gray-400"
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}

          </select>
        </div>
      </div>
      {/* ^ PAGINATION LOGIC + BUTTONS ^ */}
      {/* I can't help but feel there's a better way to do this, but it works. */}
      {/* <div>{selectedColumns.current = getIdsFromSelectedColumns()}</div> */}
    </div>
  );

}

export default EntriesList;