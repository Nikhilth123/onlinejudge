import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

const cardHover =
  "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl"

function UserProfile() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

      {/* USER HEADER */}
      <Card className={cardHover}>
        <CardContent className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="text-2xl font-bold">
              NT
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h1 className="text-2xl font-bold">
              Nikhil Thakur
            </h1>

            <p className="text-sm text-muted-foreground">
              Joined • Aug 2025
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <Badge variant="outline">User</Badge>
              <Badge variant="secondary">Active</Badge>
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
            245
          </CardContent>
        </Card>

        <Card className={cardHover}>
          <CardHeader>
            <CardTitle>Total Submissions</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            412
          </CardContent>
        </Card>

        <Card className={cardHover}>
          <CardHeader>
            <CardTitle>Accepted Submissions</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            245
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
            <p className="text-green-500 font-semibold">
              Easy
            </p>
            <p className="text-xl font-bold">
              120
            </p>
          </div>

          <div>
            <p className="text-yellow-500 font-semibold">
              Medium
            </p>
            <p className="text-xl font-bold">
              95
            </p>
          </div>

          <div>
            <p className="text-red-500 font-semibold">
              Hard
            </p>
            <p className="text-xl font-bold">
              30
            </p>
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

              <TableRow className="hover:bg-muted/40 transition-colors">
                <TableCell className="font-medium">
                  Two Sum
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    Accepted
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  2 hours ago
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-muted/40 transition-colors">
                <TableCell className="font-medium">
                  Binary Search
                </TableCell>
                <TableCell>
                  <Badge variant="destructive">
                    Wrong Answer
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  Yesterday
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  )
}

export default UserProfile
