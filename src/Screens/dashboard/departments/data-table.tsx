import {
    type ColumnDef,
    type ColumnFiltersState,
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
import React, { useEffect, useState } from "react"

import { SquarePlus } from "lucide-react"
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
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from "axios"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const [faculties, setFaculties] = useState<any[]>([])
    const [error, setError] = useState("")
    const [departmentName, setDepartmentName] = useState("")
    const [selectedFaculty, setSelectedFaculty] = useState("")

    const { token } = useSelector((state: RootState) => state.auth)
    const baseUrl = import.meta.env.VITE_BASE_URI

    // fetch faculties for select dropdown
    const fetchFaculties = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/faculties`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setFaculties(res.data)
            setError("")
        } catch (error: any) {
            if (error.response?.status === 401) {
                setError("Unauthorized. Please log in again.")
            } else {
                setError("Failed to fetch faculties.")
            }
        }
    }

    useEffect(() => {
        fetchFaculties()
    }, [])

    // 👉 You need a departments fetcher to refresh the table
    const fetchDepartments = async () => {
        try {
            // call your /api/department endpoint
            const res = await axios.get(`${baseUrl}/api/department`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            // update the table with new departments if needed
            console.log("Departments refreshed:", res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const handleSaveDepartment = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await axios.post(
                `${baseUrl}/api/department`,
                {
                    department: departmentName,
                    faculty_id: selectedFaculty,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            console.log(res);


            // reset
            setDepartmentName("")
            setSelectedFaculty("")
            // refresh departments list
            fetchDepartments()
        } catch (err: any) {
            console.error(err)
            setError("Failed to save department")
        }
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between gap-4 py-4">
                <Input
                    placeholder="Filter departments..."
                    value={
                        (table.getColumn("department")?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table.getColumn("department")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

                <Dialog>
                    <form >
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                Add <SquarePlus />
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add Department</DialogTitle>
                                <DialogDescription>
                                    Fill in the department name and select the faculty. Click
                                    "Save" when you're done.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="faculty">Faculty</Label>
                                    <Select
                                        value={selectedFaculty}
                                        onValueChange={setSelectedFaculty}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Faculty" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {faculties.length > 0 ? (
                                                faculties.map((faculty: any) => (
                                                    <SelectItem
                                                        key={faculty.id}
                                                        value={faculty.id.toString()}
                                                    >
                                                        {faculty.faculty}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem disabled value="none">
                                                    No faculties available
                                                </SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="department-name">Department Name</Label>
                                    <Input
                                        id="department-name"
                                        name="department"
                                        value={departmentName}
                                        onChange={(e) => setDepartmentName(e.target.value)}
                                        placeholder="e.g. Computer Science"
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" onClick={handleSaveDepartment}>Save Department</Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
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
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
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
