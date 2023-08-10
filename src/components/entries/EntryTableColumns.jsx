import { createColumnHelper } from "@tanstack/react-table"
import IndeterminateCheckbox from "./IndeterminateCheckbox"

const columnHelper = createColumnHelper()

export const columns = [
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
    // },
    // columnHelper.accessor("id", {
    //   header: "ID",
    // }),
    // {
    //   header: 'ID',
    //   accessorKey: 'id',
    //   maxSize: 1,
    //   size: 1,
    // },
  },
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