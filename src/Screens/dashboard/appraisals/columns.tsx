import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

export type Appraisals = {
    id: string
    firstname: string
    lastname: string
    matno: string
    percentage: string
    staff: string
    created: Date
}

export const data: Appraisals[] = [
    {
        id: "agri01",
        firstname: "John",
        lastname: "Doe",
        matno: "AG101",
        percentage: "85%",
        staff: "Dr. Smith",
        created: new Date("2024-06-01"),
    },
    {
        id: "eng01",
        firstname: "Mary",
        lastname: "Johnson",
        matno: "CE202",
        percentage: "90%",
        staff: "Engr. Adams",
        created: new Date("2024-06-03"),
    },
    {
        id: "sci01",
        firstname: "Alex",
        lastname: "Okoro",
        matno: "CS303",
        percentage: "92%",
        staff: "Prof. Chike",
        created: new Date("2024-06-05"),
    },
    {
        id: "law01",
        firstname: "Jane",
        lastname: "Obi",
        matno: "PL404",
        percentage: "88%",
        staff: "Dr. Benson",
        created: new Date("2024-06-08"),
    },
    {
        id: "hum01",
        firstname: "Peter",
        lastname: "Ali",
        matno: "EL505",
        percentage: "78%",
        staff: "Dr. Musa",
        created: new Date("2024-06-10"),
    },
]

function getGradeBadgeColor(score: number): string {
    if (score >= 70) return "bg-green-500 text-white"     // A
    if (score >= 60) return "bg-blue-500 text-white"      // B
    if (score >= 50) return "bg-yellow-500 text-black"    // C
    if (score >= 45) return "bg-orange-400 text-black"    // D
    return "bg-red-600 text-white"                        // F
}



export const columns: ColumnDef<Appraisals>[] = [
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
        id: "fullname",
        header: () => <div className="font-bold">Full Name</div>,
        cell: ({ row }) => {
            const { firstname, lastname } = row.original
            return <div className="capitalize">{`${firstname} ${lastname}`}</div>
        },
    },
    {
        accessorKey: "matno",
        header: () => <div className="font-bold">Mat No</div>,
        cell: ({ row }) => <div>{row.getValue("matno")}</div>,
    },
    {
        accessorKey: "percentage",
        header: () => <div className="font-bold">Score</div>,
        cell: ({ row }) => {
            const value = row.getValue("percentage") as string
            const numeric = parseInt(value.replace("%", ""))
            const colorClass = getGradeBadgeColor(numeric)

            return <Badge variant="outline" className={`text-xs font-medium ${colorClass}`}>{value}</Badge>
        },
    },
    {
        accessorKey: "staff",
        header: () => <div className="font-bold">Lecturer</div>,
        cell: ({ row }) => <div>{row.getValue("staff")}</div>,
    },
    {
        accessorKey: "created",
        header: () => <div className="font-bold">Date</div>,
        cell: ({ row }) => {
            const date = row.getValue("created") as Date
            return <div>{date.toLocaleDateString()}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const appraisal = row.original
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
                            onClick={() => navigator.clipboard.writeText(appraisal.id)}
                        >
                            Copy Appraisal ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View student</DropdownMenuItem>
                        <DropdownMenuItem>View appraisal</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
