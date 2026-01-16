import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Editor from "@monaco-editor/react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Sparkles } from "lucide-react"

function ProblemDesc() {
  const [language, setLanguage] = useState("cpp")
  const [code, setCode] = useState("")
  const [openAiSidebar, setOpenAiSidebar] = useState(false)
  const [opensubmissionsheet,setopensubmissionsheet]=useState(false)
  function handleaisidebar(){
    setOpenAiSidebar(true);
  }
  function handleopensubmissionsheet(){
    setopensubmissionsheet(true);
  }

  return (
    <div className="bg-background">

      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden h-full">
        <Tabs defaultValue="description" className=" flex flex-col">
          <TabsList className="w-full">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="flex-1 p-4">
            <ScrollArea className="h-full">
              <h2 className="text-lg font-semibold mb-2">Two Sum</h2>
              <p className="text-sm leading-relaxed">
                Given an array of integers nums and an integer target, return
                indices of the two numbers such that they add up to target.
              </p>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="editor" className="flex-1 p-3 flex flex-col gap-3">
            {/* Toolbar */}
            <div className="flex flex-col gap-2">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">Run</Button>
                <Button size="sm">Submit</Button>
                
                <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                   <Sparkles className="h-4 w-4 mr-1" /> AI
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start">
               

                <DropdownMenuItem asChild>
                  <button onClick={handleaisidebar}>BoilerPlate</button>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <button onClick={handleaisidebar}>Ask Hints</button>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <button onClick={handleaisidebar}>Optimize Code</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
                

                {/* <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpenAiSidebar(true)}
                >
                  <Sparkles className="h-4 w-4 mr-1" /> AI
                </Button> */}
              </div>
            </div>

            {/* Editor */}
            <div className="h-[60vh] md:flex-1 border rounded-md overflow-hidden">
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={(v) => setCode(v ?? "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  automaticLayout: true,
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="flex-1 p-4">
                <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Verdict</TableHead>
      <TableHead>Date</TableHead>
      <TableHead>Language</TableHead>
      <TableHead className="text-right">Time</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow onClick={handleopensubmissionsheet}  className="cursor-pointer hover:bg-muted/50 transition-colors">
      <TableCell className="font-medium">
       <Badge className="bg-green-600 hover:bg-green-600">
                Accepted
              </Badge>
        </TableCell>
      <TableCell>12/5/2026</TableCell>
      <TableCell>
        <Badge>
                Cpp
              </Badge>
              </TableCell>
      <TableCell className="text-right">2ms</TableCell>
    </TableRow>
  </TableBody>
</Table>
            {/* <p className="text-sm text-muted-foreground">
              No submissions yet.
            </p> */}
          </TabsContent>
        </Tabs>
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:flex flex-1">

        {/* LEFT PANEL */}
        <div className="w-1/2 border-r">
          <Tabs defaultValue="description" className="flex flex-col">
            <TabsList className="mb-1 w-full">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="flex-1">
              <ScrollArea className="h-full pr-3">
                <h2 className="text-lg font-semibold mb-2">Two Sum</h2>
                <p className="text-sm leading-relaxed">
                  Given an array of integers nums and an integer target, return
                  indices of the two numbers such that they add up to target.
                </p>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="submissions" className="flex-1">
              <ScrollArea className="h-full pr-3">
                <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Verdict</TableHead>
      <TableHead>Date</TableHead>
      <TableHead>Language</TableHead>
      <TableHead className="text-right">Time</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow onClick={handleopensubmissionsheet}  className="cursor-pointer hover:bg-muted/50 transition-colors">
      <TableCell className="font-medium">
       <Badge className="bg-green-600 hover:bg-green-600">
                Accepted
              </Badge>
        </TableCell>
      <TableCell>12/5/2026</TableCell>
      <TableCell>
        <Badge>
                Cpp
              </Badge>
              </TableCell>
      <TableCell className="text-right">2ms</TableCell>
    </TableRow>
  </TableBody>
</Table>
                {/* <p className="text-sm text-muted-foreground">
                  No submissions yet.
                </p> */}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col flex-1 ">

          {/* Toolbar */}
          <div className="flex items-center justify-between border  bg-muted/40 px-3 py-2">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="python">Python</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
                <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                   <Sparkles className="h-4 w-4 mr-1" /> AI
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start">
               

                <DropdownMenuItem asChild>
                  <button onClick={handleaisidebar}>BoilerPlate</button>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <button onClick={handleaisidebar}>Ask Hints</button>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <button onClick={handleaisidebar}>Optimize Code</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
              {/* <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenAiSidebar(true)}
              >
                <Sparkles className="h-4 w-4 mr-1" /> AI
              </Button> */}
              <Button variant="outline" size="sm">Run</Button>
              <Button size="sm">Submit</Button>
            </div>
          </div>

          {/* Editor */}
          <div className=" h-[90vh] border rounded-md overflow-hidden">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(v) => setCode(v ?? "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                automaticLayout: true,
              }}
            />
          </div>
        </div>
      </div>

      {/* AI SHEET */}
     <Sheet open={openAiSidebar} onOpenChange={setOpenAiSidebar}>
  <SheetContent className="top-[56px] h-[calc(100vh-56px)] w-full sm:w-[400px] flex flex-col">
    <SheetHeader>
      <SheetTitle>AI Assistant</SheetTitle>
      <SheetDescription>
        Ask hints, explanations or generate boilerplate.
      </SheetDescription>
    </SheetHeader>

    <ScrollArea className="mt-4 flex-1 pr-2">
      <p className="text-sm text-muted-foreground">
        AI responses will appear here...
      </p>
    </ScrollArea>
  </SheetContent>
</Sheet>

<Sheet open={opensubmissionsheet} onOpenChange={setopensubmissionsheet}>
 
  <SheetContent side="top"   className="
    top-[56px]
    h-[calc(100vh-56px)]
    w-full
    md:max-w-4xl
    md:mx-auto
    flex flex-col
  ">
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

    </div>
  )
}

export default ProblemDesc
