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
export type Visitor = {
    id: string
    ip: string
    loginDate: string // or Date if preferred
    loginTime: string
    user: string
}

// Sample login data
export const data: Visitor[] = [
    {
        id: "v001",
        user: "DE.2020/2345", // Guest student
        ip: "192.168.0.101",
        loginDate: "2025-06-10",
        loginTime: "10:42 AM",
    },
    {
        id: "v002",
        user: "Admin - Mr. John", // Staff/admin
        ip: "192.168.0.10",
        loginDate: "2025-06-10",
        loginTime: "10:50 AM",
    },
    {
        id: "v003",
        user: "DE.2021/1023",
        ip: "192.168.0.102",
        loginDate: "2025-06-10",
        loginTime: "11:03 AM",
    },
    {
        id: "v004",
        user: "Supervisor - Dr. Adaobi", // Supervisor or lecturer
        ip: "192.168.0.11",
        loginDate: "2025-06-11",
        loginTime: "07:59 AM",
    },
    {
        id: "v005",
        user: "DE.2022/3033",
        ip: "192.168.0.103",
        loginDate: "2025-06-11",
        loginTime: "08:15 AM",
    },
    {
        id: "v006",
        user: "Clerk - Jane Doe", // Non-academic staff
        ip: "192.168.0.12",
        loginDate: "2025-06-11",
        loginTime: "09:45 AM",
    },
    {
        id: "v007",
        user: "DE.2020/2501",
        ip: "192.168.0.105",
        loginDate: "2025-06-11",
        loginTime: "10:25 AM",
    },
]

// Table columns
export const columns: ColumnDef<Visitor>[] = [
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
        accessorKey: "user",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-bold"
            >
                User
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("user")}</div>,
    },
    {
        accessorKey: "ip",
        header: () => <div className="font-bold">IP Address</div>,
        cell: ({ row }) => <div>{row.getValue("ip")}</div>,
    },
    {
        accessorKey: "loginDate",
        header: () => <div className="font-bold">Date</div>,
        cell: ({ row }) => <div>{row.getValue("loginDate")}</div>,
    },
    {
        accessorKey: "loginTime",
        header: () => <div className="font-bold">Time</div>,
        cell: ({ row }) => <div>{row.getValue("loginTime")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const visitor = row.original
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
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(visitor.id)}>
                            Copy visitor ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
