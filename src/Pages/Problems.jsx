import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import { MoreVertical } from "lucide-react"

function Problems() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  function handleDeleteConfirm() {
    console.log("Problem deleted")
    setOpenDeleteDialog(false)
  }

  return (
    <div className="flex flex-col gap-8 px-4 py-6 max-w-5xl mx-auto">

      {/* Search */}
      <div className="w-full flex justify-center">
        <Input
          type="text"
          placeholder="Search problems"
          className="max-w-md"
        />
      </div>

      {/* Problems Table */}
      <Table className="rounded-xl overflow-hidden border">
        <TableBody>
          <TableRow className="cursor-pointer bg-gray-200 hover:bg-gray-400 transition-colors">

            {/* Title */}
            <TableCell className="font-medium">
              Two Sum
            </TableCell>

            {/* Difficulty */}
            <TableCell className="text-right">
              <Badge className="bg-green-600 hover:bg-green-600">
                Easy
              </Badge>
            </TableCell>

            {/* Solved */}
            <TableCell className="text-right">
              <Badge variant="secondary">
                Solved
              </Badge>
            </TableCell>

            {/* Admin Actions */}
            <TableCell>
              <div className="flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/editproblem">
                        Edit
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => setOpenDeleteDialog(true)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>

          </TableRow>
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Problem</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this problem?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDeleteDialog(false)}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default Problems
