import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { DialogClose } from "@radix-ui/react-dialog"
import type { ColumnDef } from "@tanstack/react-table"
import { Eye, MoreHorizontal, Trash2, Plus, X } from "lucide-react"

export type Criteria = {
    id: number
    name: string
    weight?: number
}

export type Appraisal = {
    id: string
    title: string
    description: string
    points: string
    status: "Draft" | "Live" | "Closed"
    created_at: string
    criterials: Criteria[]
}

export const columns: ColumnDef<Appraisal>[] = [
    {
        accessorKey: "title",
        header: "Appraisal Name",
        cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <div>{row.getValue("status")}</div>,
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => <div>{row.getValue("created_at")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const appraisal = row.original
            const [editAppraisal, setEditAppraisal] = useState<Appraisal>(appraisal)

            // Handle input changes
            const handleChange = (field: keyof Appraisal, value: string) => {
                setEditAppraisal({ ...editAppraisal, [field]: value })
            }

            // Criterials handlers
            const [criterialIdCounter, setCriterialIdCounter] = useState(1)

            const addCriterial = () => {
                const newId = criterialIdCounter
                setCriterialIdCounter(prev => prev + 1)

                setEditAppraisal(prev => ({
                    ...prev,
                    criterials: [
                        ...prev.criterials,
                        { id: newId, name: "" },
                    ],
                }))
            }

            const updateCriterial = (id: number, value: string) => {
                setEditAppraisal({
                    ...editAppraisal,
                    criterials: editAppraisal.criterials.map((c) =>
                        c.id === id ? { ...c, name: value } : c
                    ),
                })
            }

            const removeCriterial = (id: number) => {
                setEditAppraisal({
                    ...editAppraisal,
                    criterials: editAppraisal.criterials.filter((c) => c.id !== id),
                })
            }

            // Save handler (replace with API call if needed)
            const handleSave = () => {
                console.log("Saving appraisal:", editAppraisal)
                // 🔹 Call API here (PUT / PATCH request)
            }

            return (
                <div className="flex items-center gap-2">
                    {/* View/Edit Dialog */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Eye />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="lg:min-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Edit Appraisal</DialogTitle>
                                <DialogDescription>
                                    Update the appraisal details, description, points, and criterials below.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6">
                                {/* Basic Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium">Title</label>
                                        <Input
                                            value={editAppraisal.title}
                                            onChange={(e) => handleChange("title", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Grading Points</label>
                                        <Input
                                            type="text"
                                            placeholder="1-5"
                                            value={editAppraisal.points}
                                            onChange={(e) => handleChange("points", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-span-2 flex flex-col">
                                        <label className="text-sm font-medium">Description</label>
                                        <textarea
                                            className="border-dashed rounded-md border-2 p-2"
                                            value={editAppraisal.description}
                                            onChange={(e) =>
                                                handleChange("description", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Criterials */}
                                <div>
                                    <h4 className="font-semibold mb-2">Criterials</h4>
                                    <div className="gap-3 grid grid-cols-1 lg:grid-cols-3">
                                        {editAppraisal.criterials.length > 0 ? (
                                            editAppraisal.criterials.map((c, i) => (
                                                <div key={c.id} className="flex items-center gap-2">
                                                    <Input
                                                        value={c.name}
                                                        onChange={(e) =>
                                                            updateCriterial(c.id, e.target.value)
                                                        }
                                                        placeholder={`Criterial ${i + 1}`}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={addCriterial}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeCriterial(c.id)}
                                                    >
                                                        <X className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="border-2 border-dashed rounded-md col-span-3 p-4 flex flex-col gap-4 items-center justify-center">
                                                <p className="text-muted-foreground text-sm">
                                                    No criterials added.
                                                </p>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={addCriterial}
                                                >
                                                    Click to add criterial
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button onClick={handleSave}>Save Changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Delete Dialog */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                                <Trash2 />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="lg:min-w-md">
                            <DialogHeader>
                                <DialogTitle>Delete Appraisal</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete <b>{appraisal.title}</b>?
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button variant="destructive">Confirm Delete</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Status Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleChange("status", "Draft")}>
                                Draft
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleChange("status", "Live")}>
                                Live
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleChange("status", "Closed")}>
                                Closed
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
