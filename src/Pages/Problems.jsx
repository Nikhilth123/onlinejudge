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
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

      {/* 🔍 SEARCH */}
      <div className="flex justify-center">
        <Input
          placeholder="Search problems..."
          className="max-w-md"
        />
      </div>

      {/* 📋 PROBLEMS LIST */}
      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableBody>

            <TableRow
              className="
                transition-colors
                hover:bg-muted/50
              "
            >
              {/* TITLE */}
              <TableCell className="font-medium">
                <Link
                  to="/problem/1"
                  className="hover:underline"
                >
                  Two Sum
                </Link>
              </TableCell>

              {/* DIFFICULTY */}
              <TableCell className="text-right">
                <Badge
                  variant="outline"
                  className="border-green-500 text-green-500"
                >
                  Easy
                </Badge>
              </TableCell>

              {/* STATUS */}
              <TableCell className="text-right">
                <Badge variant="secondary">
                  Solved
                </Badge>
              </TableCell>

              {/* ACTIONS */}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                    >
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
                      className="text-destructive"
                      onClick={() => setOpenDeleteDialog(true)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </div>

      {/* 🗑 DELETE DIALOG */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Delete Problem
            </DialogTitle>
            <DialogDescription>
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
