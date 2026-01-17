import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useState, useEffect, useContext } from "react";
import Authcontext from "@/Context/Authcontext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {toast} from 'react-toastify'
const cardHover =
  "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl";

function UserProfile() {
  const { loading } = useContext(Authcontext);

  const [user, setUser] = useState(null);
  const [solvedproblem, setSolvedProblem] = useState([]);
  const [easyProblem, setEasyProblem] = useState(0);
  const [mediumProblem, setMediumProblem] = useState(0);
  const [hardProblem, setHardProblem] = useState(0);
  const [totalsubmissions, setTotalSubmissions] = useState(0);
  const [acceptedSubmissions, setAcceptedSubmissions] = useState(0);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loadingimage, setloadingimage] = useState(false);
  const[openimagedialog,setopenimagedialog]=useState(false);
  function showtime(prevdate) {
    const presentdate = new Date();
    const pastdate = new Date(prevdate);
    const diffSeconds = Math.floor((presentdate - pastdate) / 1000);
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
 

  const fetchUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/me`, {
        credentials: "include",
      });

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



  const fetchTotalSubmissions = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/submission/user/totalsubmissions`,
        { credentials: "include" }
      );

      if (!res.ok) {
        const data = await res.json();
 
        setTotalSubmissions(0);
        return;
      }

      const data = await res.json();

      setTotalSubmissions(data.totalSubmissions);
      setAcceptedSubmissions(data.totalacceptedSubmissions);
      setRecentSubmissions(data.recentsubmissions);
      
    } catch {
      setTotalSubmissions(0);
    }
  };

 

  const fetchSolvedProblems = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/user/solvedproblems`,
        { credentials: "include" }
      );
    

      if (!res.ok) {
        const data = await res.json();
   
        toast(data.msg);
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
    } catch(err) {
      toast(err.msg);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file)); // preview
  };

  const EditProfilePicture = async () => {
    if (!imageFile) {
     toast.error('select image to upload')
      return;
    }
    if (loadingimage) {
      return;
    }
    setloadingimage(true);
    const form = new FormData();
    form.append("profilepic", imageFile);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/profile/picture`,
        {
          method: "POST",
          credentials: "include",
          body: form,
        }
      );

      const result = await res.json();

      if (!res.ok) {
      toast.error('server error try again later');
      } else {
       
         await fetchUser();   
      setPreview(null);     
      setImageFile(null);
      }
      setopenimagedialog(false);
      setloadingimage(false);
    } catch (err) {
      
      setloadingimage(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchSolvedProblems();
    fetchTotalSubmissions();
  }, []);

  if (loading) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
     
      <Card className={cardHover}>
        <CardContent className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <Avatar className="h-24 w-24">
            {user?.profilepic && user?.profilepic?.trim() !== "" && (
              <AvatarImage src={user.profilepic} alt={user.name} />
            )}

            <AvatarFallback className="text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h1 className="text-2xl font-bold">{user?.name || "Loading..."}</h1>

            <p className="text-sm text-muted-foreground">
              {user?.email || "Loading..."}
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <Badge variant="outline">{user?.role || "User"}</Badge>
            </div>
          </div>

          <Dialog open={openimagedialog} onOpenChange={setopenimagedialog}>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile Pic</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Update Profile Picture</DialogTitle>
              </DialogHeader>

              <div className="flex flex-col items-center gap-4">
               
                <div className="w-32 h-32 rounded-full overflow-hidden border">
                  <img
                    src={preview || user?.profilepic||'/default_avatar.jpg'}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>

              
                <label className="cursor-pointer text-sm text-blue-600">
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </label>

                {/* Submit */}
                <Button
                  onClick={EditProfilePicture}
                  disabled={loading || !imageFile}
                  className="w-full"
                >
                  {loadingimage ? "Uploading..." : "Save"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* 
          <Button variant="outline" onClick={openeditprofile}>
            Edit Profile Pic
          </Button> */}
        </CardContent>
      </Card>

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
                  <TableCell className="font-medium">
                    {submission.problemId.title}
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">{submission.status}</Badge>
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
