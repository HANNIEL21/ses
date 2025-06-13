import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

export type Department = {
    id: string
    department: string
    faculty: string
    lecturer: number
}

export const data: Department[] = [
    {
        id: "agri01",
        lecturer: 12,
        department: "Animal Science",
        faculty: "Faculty of Agriculture",
    },
    {
        id: "eng01",
        lecturer: 8,
        department: "Civil Engineering",
        faculty: "Faculty of Engineering",
    },
    {
        id: "sci01",
        lecturer: 5,
        department: "Computer Science",
        faculty: "Faculty of Sciences",
    },
    {
        id: "law01",
        lecturer: 3,
        department: "Public Law",
        faculty: "Faculty of Law",
    },
    {
        id: "hum01",
        lecturer: 7,
        department: "English and Literary Studies",
        faculty: "Faculty of Humanities",
    },
]





export const columns: ColumnDef<Department>[] = [
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
        accessorKey: "department",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-bold"
                >
                    Department
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue("department")}</div>,
    },
    {
        accessorKey: "faculty",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-bold"
                >
                    Faculty
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue("faculty")}</div>,
    },
    {
        accessorKey: "lecturer",
        header: () => <div className="text-left font-bold">Lecturer</div>,
        cell: ({ row }) => <div className="lowercase">{row.getValue("lecturer")}</div>,
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]