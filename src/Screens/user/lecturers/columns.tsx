import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

// Updated Visitor type
export type Lecturer = {
    id: string
    name: string
    faculty: string 
    department: string
}

// Sample login data
export const data: Lecturer[] = [
  {
    id: "L001",
    name: "Dr. Adaobi Nkem",
    faculty: "Engineering",
    department: "Electrical Engineering",
  },
  {
    id: "L002",
    name: "Mr. John Bello",
    faculty: "Sciences",
    department: "Computer Science",
  },
  {
    id: "L003",
    name: "Prof. Fatima Yusuf",
    faculty: "Social Sciences",
    department: "Economics",
  },
  {
    id: "L004",
    name: "Dr. Emeka Obi",
    faculty: "Engineering",
    department: "Mechanical Engineering",
  },
  {
    id: "L005",
    name: "Ms. Grace Uduak",
    faculty: "Arts",
    department: "English Literature",
  },
  {
    id: "L006",
    name: "Prof. Tunde Ojo",
    faculty: "Sciences",
    department: "Mathematics",
  },
  {
    id: "L007",
    name: "Dr. Chika Okafor",
    faculty: "Education",
    department: "Educational Psychology",
  },
  {
    id: "L008",
    name: "Mr. Kelechi Duru",
    faculty: "Management Sciences",
    department: "Accounting",
  },
]


// Table columns
export const columns: ColumnDef<Lecturer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-bold"
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "faculty",
    header: () => <div className="font-bold">Faculty</div>,
    cell: ({ row }) => <div>{row.getValue("faculty")}</div>,
  },
  {
    accessorKey: "department",
    header: () => <div className="font-bold">Department</div>,
    cell: ({ row }) => <div>{row.getValue("department")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const lecturer = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(lecturer.id)}>
              Copy Lecturer ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
