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


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData extends { user?: string; ip?: string }, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [globalFilter, setGlobalFilter] = React.useState("")

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
            const user = row.original.user?.toLowerCase() ?? ""
            const ip = row.original.ip?.toLowerCase() ?? ""
            return user.includes(filterValue.toLowerCase()) || ip.includes(filterValue.toLowerCase())
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="w-full">
            <div className="flex items-center justify-between gap-4 py-4">
                <Input
                    placeholder="Search user or IP..."
                    value={table.getState().globalFilter ?? ""}
                    onChange={(event) => table.setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />

                {/* <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                Add <SquarePlus className="ml-2 h-4 w-4" />
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add Visitor</DialogTitle>
                                <DialogDescription>
                                    Fill in user/IP info. Click "Save" when done.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="user">User</Label>
                                    <Input
                                        id="user"
                                        name="user"
                                        placeholder="e.g. john.doe or DE.2020/1234"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="ip">IP Address</Label>
                                    <Input
                                        id="ip"
                                        name="ip"
                                        placeholder="e.g. 192.168.1.1"
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save Visitor</Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog> */}
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
