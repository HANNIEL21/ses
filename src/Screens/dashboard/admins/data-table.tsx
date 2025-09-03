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
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UserPlus } from "lucide-react"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { Toast } from "@/components/Toast"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData extends { firstname?: string; lastname?: string; email?: string }, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [globalFilter, setGlobalFilter] = React.useState("")

    const [open, setOpen] = React.useState(false);

    const [formData, setFormData] = React.useState({
        firstname: "",
        lastname: "",
        email: "",
        role: "ADMIN",
        password: "",
        confirm_password: "",
    });

    const { token } = useSelector((state: RootState) => state.auth)
    const baseUrl = import.meta.env.VITE_BASE_URI;

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
            const firstname = row.original.firstname?.toLowerCase() ?? ""
            const lastname = row.original.lastname?.toLowerCase() ?? ""
            const email = row.original.email?.toLowerCase() ?? ""
            return firstname.includes(filterValue.toLowerCase()) || lastname.includes(filterValue.toLowerCase()) || email.includes(filterValue.toLowerCase())
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    const formSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            Toast.fire({
                icon: 'error',
                title: "Passwords do not match"
            })
            return;
        }

        try {
            const res = await axios.post(`${baseUrl}/users`, {
                firstname: formData.firstname,
                lastname: formData.lastname,
                role: formData.role,
                email: formData.email,
                password: formData.password,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("User added:", res.data);
            Toast.fire({
                icon: 'success',
                title: "Admin created successfully"
            });

            setOpen(false);
        } catch (error) {
            console.error("Error creating user:", error);
            Toast.fire({
                icon: 'error',
                title: "Something went wrong"
            });
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between gap-4 py-4">
                <Input
                    placeholder="Search name or email..."
                    value={table.getState().globalFilter ?? ""}
                    onChange={(event) => table.setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="bg-muted">
                            <UserPlus className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Admin</DialogTitle>
                            <DialogDescription>
                                Fill in user details. Click "Add" when done.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={formSubmit}>
                            <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstname">Firstname</Label>
                                    <Input
                                        id="firstname"
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                                        placeholder="Enter First Name"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="lastname">Lastname</Label>
                                    <Input
                                        id="lastname"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                                        placeholder="Enter Last Name"
                                        required
                                    />
                                </div>

                                <div className="grid col-span-2 gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="john.doe@example.com"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="Enter Password"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="confirm_password">Confirm Password</Label>
                                    <Input
                                        id="confirm_password"
                                        name="confirm_password"
                                        type="password"
                                        value={formData.confirm_password}
                                        onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                                        placeholder="Re-enter Password"
                                        required
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline" type="button">Cancel</Button>
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
