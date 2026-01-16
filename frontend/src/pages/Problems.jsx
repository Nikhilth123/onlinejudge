import { useState, useEffect, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Authcontext from "../Context/Authcontext";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MoreVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
function Problems() {
  const { user } = useContext(Authcontext);
  const isAdmin = user?.role === "admin";
  const { toast } = useToast();

  const [problemData, setProblemData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [solvedSet, setSolvedSet] = useState(new Set());


  const fetchProblems = async () => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/problems?page=${page}&limit=2&search=${searchTerm}&difficulty=${difficultyFilter}`,
        { credentials: "include" }
      );

      if (!res.ok) throw new Error("Failed to fetch problems");

      const data = await res.json();
     
      setProblemData(data.problems);
      setTotalPages(data.totalpages);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,
      });
    }
  };

  const fetchSolvedProblems = async () => {
    if (!user) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/user/solvedproblems`,
        { credentials: "include" }
      );
    
      const data = await res.json();
     
      setSolvedSet(new Set(data.solvedProblems.map((p) => p._id)));
    } catch (err) {
     toast.error(err)
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [page, searchTerm, difficultyFilter]);

  useEffect(() => {
    fetchSolvedProblems();
  }, [user]);


  const handleDeleteConfirm = async () => {
    if (!selectedProblemId) return;

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/problems/delete/${selectedProblemId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Deletion Failed",
          description: result.message || "Problem not deleted",
        });
        return;
      }

      toast({
        title: "Problem Deleted ✅",
      });

      setOpenDeleteDialog(false);
      fetchProblems();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Server Error",
        description: "Please try again later",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
    
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Input
          placeholder="Search problems..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="max-w-md"
        />

        <Select
          value={difficultyFilter}
          onValueChange={(value) => {
            setDifficultyFilter(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

    
      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableBody>
            {problemData.map((problem) => (
              <TableRow
                key={problem._id}
                className="transition-colors hover:bg-muted/50"
              >
              
                <TableCell className="font-medium">
                  <Link
                    to={`/problems/${problem._id}`}
                    className="hover:underline"
                  >
                    {problem.title}
                  </Link>
                </TableCell>

               
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className={
                      problem.difficulty === "Easy"
                        ? "border-green-500 text-green-500"
                        : problem.difficulty === "Medium"
                        ? "border-yellow-500 text-yellow-500"
                        : "border-red-500 text-red-500"
                    }
                  >
                    {problem.difficulty}
                  </Badge>
                </TableCell>

              
                <TableCell className="text-right">
                  {solvedSet.has(problem._id) ? (
                    <Badge className="bg-green-600 text-white">Solved</Badge>
                  ) : (
                    <Badge variant="secondary">Unsolved</Badge>
                  )}
                </TableCell>

                
                <TableCell className="text-right">
                  {isAdmin && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/problem/edit/${problem._id}`}>Edit</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setSelectedProblemId(problem._id);
                            setOpenDeleteDialog(true);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

   
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Problem</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious  onClick={() =>
          page > 1 && setPage(page - 1)
        }/>
    </PaginationItem>
    
    {Array.from({length:totalPages}).map((_,i)=>{
      const p=i+1;
      return(
        <PaginationItem key={p}>
          <PaginationLink
          isActive={p===page}
          onClick={()=>setPage(p)} 
          >{p}</PaginationLink>
          </PaginationItem>
      )

    })}
    <PaginationItem>
      <PaginationNext onClick={()=>page<totalPages &&setPage(page+1)} />
    </PaginationItem>
  </PaginationContent>
</Pagination>
    </div>
  );
}

export default Problems;
