import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useState, useEffect, useContext } from "react";
import Authcontext from "@/Context/Authcontext";
import { useToast } from "@/hooks/use-toast";

const cardHover =
  "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl";

function UserProfile() {
  const { toast } = useToast();
  const { loading } = useContext(Authcontext);

  const [user, setUser] = useState(null);
  const [solvedproblem, setSolvedProblem] = useState([]);
  const [easyProblem, setEasyProblem] = useState(0);
  const [mediumProblem, setMediumProblem] = useState(0);
  const [hardProblem, setHardProblem] = useState(0);
  const [totalsubmissions, setTotalSubmissions] = useState(0);
  const [acceptedSubmissions, setAcceptedSubmissions] = useState(0);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
function showtime(prevdate){
  const presentdate=new Date();
  const pastdate=new Date(prevdate);
  const diffSeconds=Math.floor((presentdate-pastdate)/1000);
  if (diffSeconds < 60) return `${diffSeconds}s ago`;

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;

  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears}y ago`;
}
  /* ================= FETCH USER ================= */

  const fetchUser = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/user/me`,
        { credentials: "include" }
      );

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    }
  };

  /* ================= FETCH TOTAL SUBMISSIONS ================= */

  const fetchTotalSubmissions = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/submission/user/totalsubmissions`,
        { credentials: "include" }
      );
console.log("here bro ");
      if (!res.ok) {
        const data = await res.json();
        console.log("no ok bro:",data);
        setTotalSubmissions(0);
        return;
      }

      const data = await res.json();
       console.log("total submission:",totalsubmissions);
      setTotalSubmissions(data.totalSubmissions);
      setAcceptedSubmissions(data.acceptedSubmissions);

    } catch {
      setTotalSubmissions(0);
    }
  };

  /* ================= FETCH SOLVED PROBLEMS ================= */

  const fetchSolvedProblems = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/user/solvedproblems`,
        { credentials: "include" }
      );
      console.log("inside solvedproblem");

      if (!res.ok) {
        const data =await res.json();
        console.log('solved problem error:',data);
        toast({
          title: "Error",
          description: "Could not fetch solved problems",
          variant: "error",
        });
        return;
      }

      const result = await res.json();
      setSolvedProblem(result.solvedProblems);

      let e = 0,
        m = 0,
        h = 0;

      for (let i = 0; i < result.solvedProblems.length; i++) {
        if (result.solvedProblems[i].difficulty === "Easy") e++;
        else if (result.solvedProblems[i].difficulty === "Medium") m++;
        else h++;
      }

      setEasyProblem(e);
      setMediumProblem(m);
      setHardProblem(h);
    } catch {
      toast({
        title: "Server Error",
        description: "Failed to load solved problems",
        variant: "error",
      });
    }
  };

  /* ================= FETCH RECENT SUBMISSIONS ================= */

  const fetchRecentSubmissions = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/submission/user/recentsubmissions`,
        { credentials: "include" }
      );
      console.log('inside recentSubmissions');

      if (!res.ok) {
        const data=await res.json();
        console.log('recent submission error:',data);
        setRecentSubmissions([]);
        return;
      }

      const data = await res.json();
      console.log('recent submission:',data.recentsubmissions);
      setRecentSubmissions(data.recentsubmissions);
    } catch {
      setRecentSubmissions([]);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchSolvedProblems();
    console.log('thisis ok');
    fetchRecentSubmissions();
    console.log('is this ok');
    fetchTotalSubmissions();
    console.log('ya everything ok');
  }, []);

  if (loading) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

      {/* USER HEADER */}
      <Card className={cardHover}>
        <CardContent className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <Avatar className="h-24 w-24">
            {user?.profilePic && user.profilePic.trim() !== "" && (
              <AvatarImage
                src={user.profilePic}
                alt={user.name}
              />
            )}

            <AvatarFallback className="text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h1 className="text-2xl font-bold">
              {user?.name || "Loading..."}
            </h1>

            <p className="text-sm text-muted-foreground">
              {user?.email || "Loading..."}
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <Badge variant="outline">
                {user?.role || "User"}
              </Badge>
            </div>
          </div>

          <Button variant="outline">
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className={cardHover}>
          <CardHeader>
            <CardTitle>Total Problems Solved</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {solvedproblem.length}
          </CardContent>
        </Card>

        <Card className={cardHover}>
          <CardHeader>
            <CardTitle>Total Submissions</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {totalsubmissions}
          </CardContent>
        </Card>

        <Card className={cardHover}>
          <CardHeader>
            <CardTitle>Accepted Submissions</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {acceptedSubmissions}
          </CardContent>
        </Card>
      </div>

      {/* SOLVED BREAKDOWN */}
      <Card className={cardHover}>
        <CardHeader>
          <CardTitle>Solved Problems by Difficulty</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-green-500 font-semibold">Easy</p>
            <p className="text-xl font-bold">{easyProblem}</p>
          </div>
          <div>
            <p className="text-yellow-500 font-semibold">Medium</p>
            <p className="text-xl font-bold">{mediumProblem}</p>
          </div>
          <div>
            <p className="text-red-500 font-semibold">Hard</p>
            <p className="text-xl font-bold">{hardProblem}</p>
          </div>
        </CardContent>
      </Card>

      {/* RECENT SUBMISSIONS */}
      <Card className={cardHover}>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableBody>
              {recentSubmissions.length === 0 && (
                <TableRow>
                  <TableCell className="text-center text-muted-foreground">
                    No recent submissions
                  </TableCell>
                </TableRow>
              )}

              {recentSubmissions.map((submission) => (
                <TableRow
                  key={submission._id}
                  className="hover:bg-muted/40 transition-colors"
                >
                  <TableCell className="font-medium" aschild>
                    {submission.problemId.title}
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">
                      {submission.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right text-sm text-muted-foreground">
                    {showtime(submission.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}

export default UserProfile;
