import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FilePlus, Plus, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { Toast } from "@/components/Toast"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData extends { title?: string }, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [globalFilter, setGlobalFilter] = React.useState("")

    const [open, setOpen] = React.useState(false)

    const [formData, setFormData] = React.useState({
        name: "",
        status: "draft",
        criteria: [{ id: Date.now(), value: "" }],
    })

    const { token } = useSelector((state: RootState) => state.auth)
    const baseUrl = import.meta.env.VITE_BASE_URI

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: (row, _columnId, filterValue) => {
            const name = row.original.title?.toLowerCase() ?? ""
            return name.includes(filterValue.toLowerCase())
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    // Add new criteria
    const addCriteria = () => {
        setFormData({
            ...formData,
            criteria: [...formData.criteria, { id: Date.now(), value: "" }],
        })
    }

    // Remove criteria by id
    const removeCriteria = (id: number) => {
        setFormData({
            ...formData,
            criteria: formData.criteria.filter((c) => c.id !== id),
        })
    }

    // Update criteria
    const updateCriteria = (id: number, value: string) => {
        setFormData({
            ...formData,
            criteria: formData.criteria.map((c) =>
                c.id === id ? { ...c, value } : c
            ),
        })
    }

    const formSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        if (formData.name.trim() === "") {
            Toast.fire({
                icon: "error",
                title: "Name field is empty ",
            })
            return
        }

        try {
            const res = await axios.post(
                `${baseUrl}/users`,
                {
                    name: formData.name,
                    status: formData.status,
                    criteria: formData.criteria.map((c) => c.value),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            console.log("Appraisal added:", res.data)
            Toast.fire({
                icon: "success",
                title: "Appraisal created successfully",
            })

            setFormData({
                name: "",
                status: "draft",
                criteria: [{ id: Date.now(), value: "" }],
            })
            setOpen(false)
        } catch (error) {
            console.error("Error creating appraisal:", error)
            Toast.fire({
                icon: "error",
                title: "Something went wrong",
            })
        }
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between gap-4 py-4">
                <Input
                    placeholder="Search title..."
                    value={table.getState().globalFilter ?? ""}
                    onChange={(event) =>
                        table.setGlobalFilter(event.target.value)
                    }
                    className="max-w-sm"
                />

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="bg-muted">
                            <FilePlus className="h-4 w-4" /> New Appraisal
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Create Appraisal</DialogTitle>
                            <DialogDescription>
                                Fill in appraisal details. Click "Add" when done.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={formSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Appraisal Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="Enter Appraisal Name"
                                        required
                                    />
                                </div>

                                {/* Criteria fields */}
                                <div className="grid gap-2">
                                    <Label>Criteria</Label>
                                    {formData.criteria.map((c, index) => (
                                        <div
                                            key={c.id}
                                            className="flex gap-2 items-center"
                                        >
                                            <Input
                                                value={c.value}
                                                onChange={(e) =>
                                                    updateCriteria(
                                                        c.id,
                                                        e.target.value
                                                    )
                                                }
                                                placeholder={`Criteria ${index + 1
                                                    }`}
                                                required
                                            />

                                            {/* Plus button */}
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={addCriteria}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>

                                            {/* Remove button (only show if > 1) */}
                                            {formData.criteria.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        removeCriteria(c.id)
                                                    }
                                                >
                                                    <X className="h-4 w-4 text-red-500" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button type="submit">Add</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
