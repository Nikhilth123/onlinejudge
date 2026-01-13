import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Editor } from "@monaco-editor/react";

function ProblemDesc2() {
    const [language,setLanguage]=useState('cpp');
    const [openAiSidebar,setOpenAiSidebar]=useState(false)
    const [opensubmissionsheet,setopensubmissionsheet]=useState(false)
    const [code,setCode]=useState(" ");
    function handleaisidebar(){
        setOpenAiSidebar(true);
    }
    function handleopensubmissionsheet(){
        setopensubmissionsheet(true);
    }
  return (
    <div className="flex flex-col md:flex-row w-full flex-1 overflow-hidden">
          <div className="md:hidden h-full">
        <Tabs defaultValue="description" className=" flex flex-col">
          <TabsList className="w-full">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="flex-1 p-4">
            <ScrollArea className="h-full flex-1">
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

        {/*Desktop view++++++++++++++++++++++++++++++++++++++++++++++++*/}
      {/* Left Column (Problem Description) */}
      <div className=" hidden md:flex flex-col flex-1 border-r">
        <Tabs
          defaultValue="Description"
          className="flex flex-col h-full w-full"
        >
          <div className="px-4 pt-2">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="Description">Description</TabsTrigger>
              <TabsTrigger value="Submission">Submission</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="Description"
            className="flex-1 overflow-hidden mt-0"
          >
            {/* The magic: calc(100dvh - total_header_footer_tabs_height) 
               OR just use flex-1 on the ScrollArea if the parent is h-full 
            */}
            <ScrollArea className="h-[calc(100dvh-200px)] w-full p-4">
              <div className="pr-4">
                <h2 className="text-xl font-bold mb-4">Jokester's Castle</h2>
                <p>
                  Jokester began sneaking into the castle in the middle of the
                  night and leaving jokes all over the place... Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Dignissimos,
                  cumque expedita totam recusandae sed, sit atque culpa porro
                  saepe modi quibusdam. Omnis odio ex assumenda asperiores
                  maxime qui quod corrupti tempora fugiat quasi dolorem commodi
                  rem similique minima vitae illum, aperiam ipsum, nihil
                  architecto, accusamus excepturi voluptatum esse neque nostrum.
                  Nisi, id accusantium! Rem maxime suscipit aspernatur. Animi,
                  magni. Doloribus optio minima explicabo maiores eum autem,
                  voluptatibus debitis cum ut consequatur dignissimos aliquam
                  adipisci deleniti molestiae deserunt ipsa vitae temporibus
                  exercitationem quaerat labore sit aut. Rerum praesentium modi
                  ea quis deleniti assumenda blanditiis laudantium, ipsum
                  similique mollitia? Sit doloremque laudantium temporibus
                  adipisci quaerat voluptas dolore, earum rerum dolorem quasi
                  dicta enim tenetur perspiciatis nihil harum. Sapiente omnis
                  incidunt dolores reprehenderit doloribus, quam asperiores
                  ipsam nemo laudantium fugiat excepturi alias voluptas
                  provident tempore quaerat voluptatem velit aut magni fuga,
                  sequi deserunt. Doloremque natus voluptas dolores accusantium!
                  Reprehenderit facilis animi consequatur doloremque nemo.
                  Ducimus numquam nam voluptates delectus ex! Repellendus
                  quisquam eveniet adipisci laboriosam voluptatibus non
                  doloribus, aperiam tenetur nisi perferendis illum voluptate
                  illo ut libero laborum unde similique minima tempore explicabo
                  autem aliquid eos beatae! Id odit exercitationem, asperiores,
                  consequatur delectus temporibus pariatur facilis nisi repellat
                  molestias a praesentium aut! Dicta! Lorem ipsum dolor sit amet
                  consectetur, adipisicing elit. Quaerat, at quo sunt rem fugiat
                  culpa reiciendis impedit aperiam ea et quas unde sit corporis
                  esse molestias incidunt, laboriosam repellendus aut repellat
                  numquam laudantium expedita excepturi voluptate eum. Ex,
                  voluptates dolorem ratione at sequi cupiditate quo quidem
                  corporis. Ipsa, ab nisi aspernatur nemo nesciunt porro
                  veritatis necessitatibus reiciendis maxime iure eius quidem
                  dolorum fugiat voluptate minima praesentium quas suscipit cum,
                  rem animi nihil ad cumque doloremque quasi. Nostrum,
                  consequatur. Mollitia quisquam nisi aliquam, magnam excepturi
                  sapiente, quos tempora culpa eos, molestias quod fugit
                  deserunt a. Mollitia nisi eum blanditiis et, laudantium sit
                  praesentium corrupti dolorum provident placeat dignissimos
                  exercitationem nam veritatis cumque, sed sequi quas alias
                  consequuntur culpa, necessitatibus vitae tenetur. Alias,
                  reprehenderit temporibus nulla blanditiis natus suscipit
                  maiores voluptatem exercitationem, quaerat provident soluta
                  fugiat! Laborum voluptate excepturi consequatur nulla
                  aspernatur aut porro, esse provident atque error recusandae
                  rerum ducimus minima? Maiores, ipsam? Architecto alias nisi,
                  ut nesciunt error quidem doloremque eligendi molestias quaerat
                  a animi quibusdam quas iusto, aut explicabo similique corporis
                  debitis omnis reiciendis sunt quo provident? Tempore quo
                  praesentium voluptates at sequi, odit laborum recusandae,
                  corrupti velit, quibusdam sapiente odio voluptas corporis?
                  Rerum praesentium architecto nobis numquam voluptate!
                  {/* ... your long text ... */}
                </p>
                {/* Repetitive content to ensure scrolling */}
                <div className="h-full mt-4 bg-slate-50 rounded border-dashed border-2 flex items-center justify-center text-muted-foreground">
                  Long Content Area (Scroll Test)
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="Submission" className="flex-1">
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

      {/* Right Column (Code Editor Placeholder) */}
      <div className="flex-1 hidden md:block bg-muted/20">
        {/* Your Code Editor goes here */}
        <div className="flex flex-row justify-between bg-gray-200 p-1">
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
          <DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="ghost" className="flex items-center gap-1">
                   <Sparkles className="h-4 w-4 mr-1" /> AI
                </Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem asChild>
        <button onClick={handleaisidebar}>BoilerPlate</button></DropdownMenuItem>
     <DropdownMenuItem asChild>
        <button onClick={handleaisidebar}>Ask Hints</button></DropdownMenuItem>
         <DropdownMenuItem asChild>
        <button onClick={handleaisidebar}>Optimise</button></DropdownMenuItem>
         <DropdownMenuItem asChild>
        <button onClick={handleaisidebar}>Explain soln</button></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
<div className="px-2">
  <Button className="mx-4">Run</Button>
          <Button className="bg-green-500 hover:bg-green-600">Submit</Button>
          </div>
        </div>
        <div className="h-[75vh] overflow-hidden w-full">
        <Editor
        theme="vs-dark"
      height="100%" // Now 100% refers to the flex-1 div above
      language={language}
      options={{
        automaticLayout: true, // Crucial: resizes editor when window changes
        minimap: { enabled: false }
      }}
        >

        </Editor>
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
  );
}

export default ProblemDesc2;
