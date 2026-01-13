import { useState } from "react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { MoreVertical, Plus } from "lucide-react"

function AdminDashboard() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  function handleDeleteConfirm() {
    console.log("Problem deleted")
    setOpenDeleteDialog(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-xl transition-all hover:-translate-y-0.5">
          <CardHeader>
            <CardDescription>Total Problems</CardDescription>
            <CardTitle className="text-5xl">2456</CardTitle>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-xl transition-all hover:-translate-y-0.5">
          <CardHeader>
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-5xl">1324</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* 🔥 ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/createproblem">
          <Card
            className="
              group cursor-pointer
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-2xl
              hover:border-primary
            "
          >
            <CardContent className="h-28 flex items-center justify-center gap-3">
              <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary transition" />
              <span className="text-2xl font-semibold">Create Problem</span>
            </CardContent>
          </Card>
        </Link>

        <Card className="hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle>Grant Admin Access</CardTitle>
            <CardDescription>
              Give admin privileges to an existing user
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Input placeholder="Enter user email" />
            <Button>Grant</Button>
          </CardContent>
        </Card>
      </div>

      {/* 🔥 TABLE */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Recent Created Problems
        </h2>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow
                className="
                  transition-colors
                  hover:bg-muted/50
                "
              >
                <TableCell className="font-medium">
                  Two Sum
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    Easy
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to="/editproblem">Edit</Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-red-600"
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
        </Card>
      </div>

      {/* 🔥 DELETE DIALOG */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Problem</DialogTitle>
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

export default AdminDashboard
