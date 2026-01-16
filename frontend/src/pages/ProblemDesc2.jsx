import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState,useEffect} from "react";
import { Editor } from "@monaco-editor/react";
import Authcontext from "@/Context/Authcontext";
import debounce from "lodash.debounce";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ChevronDown,ChevronUp } from "lucide-react";
function ProblemDesc2() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(null);
  const [openAiSidebar, setOpenAiSidebar] = useState(false);
  const [openSubmissionSheet, setOpenSubmissionSheet] = useState(false);
const [problemdata,setproblemdata]=useState({})
const [showTags,setShowTags]=useState(false)
const[loading,setloading]=useState(false)
const [airesponseloading,setairesponseloading]=useState(false)
const {id}=useParams();
const {user}=useContext(Authcontext)
const [airesponse,setairesponse]=useState(null)
const languagekey=`lang-${user?.id || 'guest'}-${id}`;
  const [language,setLanguage]=useState(()=>{return localStorage.getItem(languagekey)||'cpp'})
  const localkey=`code-${user?.id||'guest'}-${id}-${language}`;
const[submissiondata,setsubmissiondata]=useState([]);
    const [selectedsubmission,setselectedsubmission]=useState(null)
const [customPrompt, setCustomPrompt] = useState("");
const [activeAiTask, setActiveAiTask] = useState(null);
const fetchproblemdata=async()=>{
  try{
  const res=await fetch(`${import.meta.env.VITE_BASE_URL}/api/problems/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      const problemdata=await res.json();
      console.log("problem data:",problemdata);
      if(!res.ok){
        console.log(problemdata.msg);
      }
      else{
          setproblemdata(problemdata)
          setInput(problemdata.sampleInput)
      }
    }
    catch(err){
      console.log(err);
    }
}
 function handleClearOutput(){
  setOutput('');
 }
const handleRun=async()=>{
if(!user){
  console.log('login to run code');
  useNavigate('/login')
  return;
}
  if(loading)return;
  setloading(true);
  try{
     const payload = {
        code,
        language,
        input: input
      };
      const res=await fetch(`${import.meta.env.VITE_COMPILE_URL}/api/run/code`,{
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result=await res.json();
      console.log(result);
      if(!res.ok){
        console.log(result.msg);
        setloading(false);
      }
      else{
      setOutput(result);
      setloading(false);
      }
  }
  catch(err){
    console.log(err);
    setloading(false);
  }
  
}
const handleSubmit=async()=>{
if(!user){
  console.log('login to submit the code');
  useNavigate('/login');
}
if(loading){
  console.log('loading not set to false')
  return;
}
setloading(true);
try{
  const payload={
      code:code,
      language:language,
    }
  const res=await fetch(`${import.meta.env.VITE_BASE_URL}/api/submit/${id}`,{
      method:'POST',
      credentials:'include',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(payload)
    })
    const result=await res.json();
    if(!res.ok){
      console.log(result.msg)
      setloading(false);
      return;
    }
    else{
      console.log(result);
      setOutput(result)
      setloading(false)

    }
  
}
catch(err){
  console.log(err);
  setloading(false);
}
}

const handlesubmissiondetails=async()=>{
   try{
        const res=await fetch(`${import.meta.env.VITE_BASE_URL}/api/submission/${id}`,{
            method:'GET',
            credentials:'include',
        })
        if(!res.ok){

            const result=await res.json();
            
            console.log(result.msg)
        }
        else{
            const result=await res.json();
          
            console.log(result)
            setsubmissiondata(result);
            
                
        }
    }catch(err){
        console.log(err)
       
    }
}
   useEffect(()=>{
        handlesubmissiondetails();
    },[])

const handleairesponse=async(payload)=>{
    // const payload={
    //   language:language,
    //   code:code,
    //   question:problemdata.description+problemdata.inputFormat,
    //   error:output.error,
    //   task:prompt
    // }
    try{
      const res=await fetch(`${import.meta.env.VITE_COMPILE_URL}/api/ai/help`,{
        method:'POST',
       headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify(payload)
      })
      if(!res.ok){
         const result=await res.json()
       console.log('Ai result error:',result);

      }
      else{
      const result=await res.json()
     console.log(result);
      if(prompt!='boilerplate')
      setairesponse(result)
    else setCode(result);
      }

    }
    catch(err){
      console.log(err);

    }
    

  }


  const saveCode=debounce(async(newcode)=>{
    localStorage.setItem(localkey,newcode);
    if(user?.id){
      const userId=user?.id
     
      await fetch(`${import.meta.env.VITE_BASE_URL}/api/code/savedraft/${id}`,{
        method:'POST',
         headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId, id, language, code: newcode }),
      })
    }
  },2000);

    const handleEditorChange = (value) => {
    setCode(value);
  saveCode(value);
  };

    useEffect(() => {
    const loadDraft = async () => {
      console.log(localkey)
      const local = localStorage.getItem(localkey);
      setCode(local || '');

      if (user?.id) {
        const userId=user?.id
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/code/getdraft/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({userId , id, language }),
        });
        const data = await res.json();
        if (data.code) {
          setCode(data.code);
          localStorage.setItem(localkey, data.code); 
          return;
        }
      }

      if(!local && problemdata?.description){
        handleairesponse('boilerplate');
      }
      else{
      setCode(local||'')
      }
    };
    loadDraft();
  }, [user, id, language]);


useEffect(()=>{
  fetchproblemdata();
},[])

const handleCustomPrompt = () => {
  if (airesponseloading) return;
  if (!customPrompt.trim()) return;

  triggerAi(customPrompt);
  setCustomPrompt("");
};


const triggerAi = async (task) => {
  console.log('trigger ai called bro')
  if (airesponseloading){
    console.log('yes here ')
    return;
  }
  console.log('here reached ')
  let payload;
  if(customPrompt)payload={task:task}
else  payload={
      language:language,
      code:code,
      question:`${problemdata.description}+${problemdata.inputFormat}`,
      error:output?.error||'',
      task:task
    }
  setOpenAiSidebar(true);
  console.log('jfsdfsd')
  setairesponseloading(true);
  console.log('jbfhdsfjksdkfsdkjfsds')
  setActiveAiTask(task);
  setairesponse(null);

  try {
    console.log('hwllo i am here ')
    await handleairesponse(payload);
  } finally {
    setairesponseloading(false);
  }
};


  return (
    <div className="h-full flex flex-col md:flex-row overflow-hidden">

      {/* ================= MOBILE VIEW (UNCHANGED) ================= */}
      <div className="md:hidden h-full flex flex-col">
        <Tabs defaultValue="description" className="flex flex-col h-full">
          <TabsList className='w-full'>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="flex-1 overflow-hidden">
            <ScrollArea className="h-full p-4">
              <h2 className="text-lg font-bold mb-2">{problemdata.title}</h2>
              {problemdata.difficulty=='Easy'&& <Badge className='bg-green-600'>Easy</Badge>}
             {problemdata.difficulty=='Medium'&& <Badge className='bg-yellow-400'>Medium</Badge>}
             {problemdata.difficulty=='Hard'&& <Badge className='bg-red-600'>Hard</Badge>}
              <p>
               {problemdata.description}
              </p>
              <h3 className="text-lg font-semibold mb-2">Input</h3>
              <p>{problemdata.inputFormat}</p>
              <h3 className="text-lg font-semibold mb-2">Output</h3>
              <p>{problemdata.outputFormat}</p>
              <h4 className="text-lg font-semibold mb-2">Constraints</h4>
              <p>{problemdata.constraints}</p>
              <h3 className="text-lg font-semibold mb-2">SampleInput</h3>
              <pre className="border p-2 rounded bg-secondary">{problemdata.sampleInput}</pre>
              <h3 className="text-lg font-semibold mb-2">SampleOutput</h3>
              <pre className="border p-2 rounded bg-secondary">{problemdata.sampleOutput}</pre>
               <div className="mt-3">
      
      <button
        onClick={() => setShowTags(!showTags)}
        className="
          flex items-center gap-1
          text-lg font-semibold mb-2
        "
      >
        {showTags ? "Tags" : "Tags"}
        {showTags ? (
          <ChevronUp size={16} />
        ) : (
          <ChevronDown size={16} />
        )}
      </button>

      {/* Tags */}
      {showTags && (
        <div className="flex flex-wrap gap-2 mt-2">
          {problemdata.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="
                text-xs
                rounded-full
                px-3
                py-1
              "
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="editor" className="flex-1 flex flex-col gap-3 p-3 overflow-hidden">
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
                <Button size="sm" onClick={handleRun}>Run</Button>
                <Button size="sm" onClick={handleSubmit}>Submit</Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Sparkles className="h-4 w-4 mr-1" /> AI
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setOpenAiSidebar(true)}>
                      BoilerPlate
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpenAiSidebar(true)}>
                      Ask Hints
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpenAiSidebar(true)}>
                      Optimize Code
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Editor */}
            <div className="flex-1 overflow-hidden border rounded-md">
              <Editor
                theme="vs-dark"
                language={language}
                value={code}
                onChange={handleEditorChange}
                options={{
                  minimap: { enabled: false },
                  automaticLayout: true,
                }}
              />
            </div>

            {/* Input */}
            <div>
              <p className="text-sm font-medium">Input</p>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-20 resize-none border rounded p-2 font-mono text-sm"
              />
            </div>

            {/* Output */}
            {output && (
  <div className="border-t bg-muted p-2">
    <div className="flex items-center justify-between mb-1">
      <p className="text-sm font-medium">Output</p>
      <Button variant="ghost" size="sm" onClick={handleClearOutput}>
        Clear
      </Button>
    </div>

    <ScrollArea className="h-[160px] border rounded p-2">
     {(output.verdict=='Success'||output.verict=='Accepted')&& <h3 className="font-semibold text-green-700">{output.verdict}</h3>}
     {(output.verdict!='Success'||output.verdict!='Accepted')&&<h3 className="font-semibold text-red-500">{output.verdict}</h3>}

      {output.error && (
        <p className="text-red-500 whitespace-pre-wrap">
          {output.error}
        </p>
      )}

      {output.output && (
        <pre className="font-mono whitespace-pre-wrap">
        {output.output}
        </pre>
      )}
    
    </ScrollArea>
  </div>
)}
          </TabsContent>

          <TabsContent value="submissions" className="flex-1 overflow-hidden p-4">
            <ScrollArea className="h-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Verdict</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Lang</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                 {submissiondata.map((submissions)=>{
                  return(
                      <TableRow onClick={()=>{
                          setselectedsubmission(submissions)
                        setOpenSubmissionSheet(true)
                      }} key={submissions._id}>
                        <TableCell>
                      {submissions.status=='Accepted'&&
                      <Badge  className="bg-green-600">{submissions.status}</Badge>
                      } 
                      {
                        submissions.status!='Accepted'&&
                        <Badge  className="bg-red-600">{submissions.status}</Badge>
                      }
                        </TableCell>
                        <TableCell>{new Date(submissions.createdAt).toLocaleString()}</TableCell>
                        <TableCell>{submissions.language}</TableCell>
                        <TableCell>{submissions.executionTime}</TableCell>
                      </TableRow>
                  )
                 })}
                 
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* ================= DESKTOP VIEW (STRUCTURE SAME) ================= */}
      <div className="hidden md:flex flex-1 overflow-hidden">

        {/* LEFT */}
        <div className="flex-1 border-r overflow-hidden">
          <Tabs defaultValue="description" className="flex flex-col h-full">
            <TabsList className='w-full'>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="submission">Submission</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full p-4">
               <h2 className="text-lg font-bold mb-2">{problemdata.title}</h2>
              {problemdata.difficulty=='Easy'&& <Badge className='bg-green-600'>Easy</Badge>}
               {problemdata.difficulty=='Medium'&& <Badge className='bg-yellow-400'>Medium</Badge>}
             {problemdata.difficulty=='Hard'&& <Badge className='bg-red-600'>Hard</Badge>}
             
              <p>
               {problemdata.description}
              </p>
              <h3 className="text-lg font-semibold mb-2">Input</h3>
              <p>{problemdata.inputFormat}</p>
              <h3 className="text-lg font-semibold mb-2">Output</h3>
              <p>{problemdata.outputFormat}</p>
              <h4 className="text-lg font-semibold mb-2">Constraints</h4>
              <p>{problemdata.constraints}</p>
              <h3 className="text-lg font-semibold mb-2">SampleInput</h3>
              <pre className="border p-2 rounded bg-secondary">{problemdata.sampleInput}</pre>
              <h3 className="text-lg font-semibold mb-2">SampleOutput</h3>
              <pre className="border p-2 rounded bg-secondary">{problemdata.sampleOutput}</pre>
               <div className="mt-3">
      
      <button
        onClick={() => setShowTags(!showTags)}
        className="
          flex items-center gap-1
          text-lg font-semibold mb-2
        "
      >
        {showTags ? "Tags" : "Tags"}
        {showTags ? (
          <ChevronUp size={16} />
        ) : (
          <ChevronDown size={16} />
        )}
      </button>

      {/* Tags */}
      {showTags && (
        <div className="flex flex-wrap gap-2 mt-2">
          {problemdata.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="
                text-xs
                rounded-full
                px-3
                py-1
              "
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="submission" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Verdict</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Lang</TableHead>
                      <TableHead className="text-right">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissiondata.map((submissions)=>{
                  return(
                      <TableRow onClick={()=>{
                          setselectedsubmission(submissions)
                        setOpenSubmissionSheet(true)
                        }} key={submissions._id} className='hover:cursor-pointer'>
                        <TableCell>
                      {submissions.status=='Accepted'&&
                      <Badge  className="bg-green-600">{submissions.status}</Badge>
                      } 
                      {
                        submissions.status!='Accepted'&&
                        <Badge  className="bg-red-600">{submissions.status}</Badge>
                      }
                        </TableCell>
                        <TableCell>{new Date(submissions.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{submissions.language}</TableCell>
                        <TableCell>{submissions.executionTime}</TableCell>
                      </TableRow>
                  )
                 })}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex flex-col overflow-hidden bg-muted/20">

          {/* Toolbar */}
          <div className="flex justify-between p-2 bg-background border-b">
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
              <Button onClick={handleRun}>Run</Button>
              <Button className="bg-green-500 hover:bg-green-600" onClick={handleSubmit}>Submit</Button>

             <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost">
      <Sparkles className="h-4 w-4 mr-1" />
      AI
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent>
    <DropdownMenuItem onClick={() => triggerAi("hint")}>
      Hint
    </DropdownMenuItem>

    <DropdownMenuItem onClick={() => triggerAi("explain")}>
      Explain Code
    </DropdownMenuItem>

    <DropdownMenuItem onClick={() => triggerAi("fix")}>
      Fix Error
    </DropdownMenuItem>

    <DropdownMenuItem onClick={() => triggerAi("optimize")}>
      Optimize Code
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-hidden">
            <Editor
              theme="vs-dark"
              language={language}
              value={code}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                automaticLayout: true,
              }}
            />
          </div>

        
<div className="border-t bg-background p-2">
  <p className="text-sm font-medium mb-1">Input</p>
  <ScrollArea className="max-h-[140px] border rounded">
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="w-full min-h-[120px] resize-none p-2 font-mono text-sm outline-none"
      placeholder="Enter custom input..."
    />
  </ScrollArea>
</div>

{/* OUTPUT (SCROLLABLE + CLEAR BUTTON) */}
{output && (
  <div className="border-t bg-muted p-2">
    <div className="flex items-center justify-between mb-1">
      <p className="text-sm font-medium">Output</p>
      <Button variant="ghost" size="sm" onClick={handleClearOutput}>
        Clear
      </Button>
    </div>

    <ScrollArea className="h-[160px] border rounded p-2">
     {(output.verdict=='Success'||output.verict=='Accepted')&& <h3 className="font-semibold text-green-700">{output.verdict}</h3>}
     {(output.verdict!='Success'||output.verdict!='Accepted')&&<h3 className="font-semibold text-red-500">{output.verdict}</h3>}

      {output.error && (
        <p className="text-red-500 whitespace-pre-wrap">
          {output.error}
        </p>
      )}

      {output.output && (
        <pre className="font-mono whitespace-pre-wrap">
        {output.output}
        </pre>
      )}
    
    </ScrollArea>
  </div>
)}



        </div>
      </div>

      {/* ================= AI SHEET (UNCHANGED) ================= */}
      <Sheet open={openAiSidebar} onOpenChange={setOpenAiSidebar}>
  <SheetContent className="top-[56px] h-[calc(100dvh-56px)] w-full md:w-[420px] flex flex-col">

    {/* HEADER */}
    <SheetHeader>
      <SheetTitle className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-purple-500" />
        AI Assistant
      </SheetTitle>

      {activeAiTask && (
        <SheetDescription className="capitalize">
          Task: {activeAiTask}
        </SheetDescription>
      )}
    </SheetHeader>

    {/* RESPONSE */}
    <ScrollArea className="flex-1 mt-4 border rounded p-3">
      {airesponseloading && (
        <p className="text-sm text-muted-foreground animate-pulse">
          AI is thinking...
        </p>
      )}

      {!airesponseloading && !airesponse && (
        <p className="text-sm text-muted-foreground">
          Ask AI using the options or write your own prompt below.
        </p>
      )}

      {airesponse && (
        <pre className="whitespace-pre-wrap text-sm font-mono">
          {airesponse}
        </pre>
      )}
    </ScrollArea>

    {/* CUSTOM PROMPT INPUT */}
    <div className="border-t pt-2 mt-2 flex gap-2">
      <textarea
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
        placeholder="Ask AI anything..."
        rows={2}
        className="flex-1 resize-none border rounded p-2 text-sm font-mono"
        disabled={airesponseloading}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleCustomPrompt();
          }
        }}
      />

      <Button
        size="sm"
        onClick={handleCustomPrompt}
        disabled={airesponseloading || !customPrompt.trim()}
      >
        Send
      </Button>
    </div>

  </SheetContent>
</Sheet>

   <Sheet open={openSubmissionSheet} onOpenChange={setOpenSubmissionSheet}>
  <SheetContent
    side="top"
    className="
      top-[56px]
      inset-x-0
      bottom-0
      w-full
      md:max-w-4xl
      md:mx-auto
      p-0
      flex
      flex-col
      bg-background
      overflow-x-hidden
    "
  >
    {/* HEADER */}
    <SheetHeader className="px-4 py-3 border-b shrink-0">
      <SheetTitle className="text-sm md:text-lg">
        Submission Details : {problemdata?.title}
      </SheetTitle>
      <SheetDescription className="text-xs md:text-sm">
        Detailed result of this submission
      </SheetDescription>
    </SheetHeader>

    {/* BODY */}
    {selectedsubmission && (
      <ScrollArea className="flex-1 px-4 py-3 overflow-x-hidden">
        <div className="space-y-5 pb-8">

          {/* META */}
          <div className="flex flex-wrap gap-2 text-xs md:text-sm items-center">
            <Badge>{selectedsubmission.language}</Badge>

            <Badge
              className={
                selectedsubmission.status === "Accepted"
                  ? "bg-green-600"
                  : "bg-red-600"
              }
            >
              {selectedsubmission.status}
            </Badge>

            <span className="text-muted-foreground">
              {new Date(selectedsubmission.createdAt).toLocaleString()}
            </span>

            <span className="text-muted-foreground">
              Time: {selectedsubmission.executionTime} ms
            </span>
          </div>

          {/* CODE */}
          <div>
            <h3 className="font-semibold text-sm mb-1">
              Submitted Code
            </h3>
            <pre
              className="
                bg-muted
                p-3
                rounded
                text-xs
                md:text-sm
                max-w-full
                overflow-x-auto
                whitespace-pre-wrap
                break-all
                break-words
                max-h-[320px]
              "
            >
              {selectedsubmission.code}
            </pre>
          </div>

          {/* INPUT */}
          {selectedsubmission.input && (
            <div>
              <h3 className="font-semibold text-sm mb-1">
                Input
              </h3>
              <pre
                className="
                  bg-muted
                  p-3
                  rounded
                  text-xs
                  md:text-sm
                  overflow-x-auto
                  whitespace-pre-wrap
                  break-words
                  max-h-[200px]
                "
              >
                {selectedsubmission.input}
              </pre>
            </div>
          )}

          {/* OUTPUT */}
          {selectedsubmission.output && (
            <div>
              <h3 className="font-semibold text-sm mb-1">
                Output
              </h3>
              <pre
                className="
                  bg-muted
                  p-3
                  rounded
                  text-xs
                  md:text-sm
                  overflow-x-auto
                  whitespace-pre-wrap
                  break-words
                  max-h-[200px]
                "
              >
                {selectedsubmission.output}
              </pre>
            </div>
          )}

          {/* ERROR */}
          {selectedsubmission.error && (
            <div>
              <h3 className="font-semibold text-sm mb-1 text-red-500">
                Error
              </h3>
              <pre
                className="
                  bg-red-50
                  text-red-600
                  p-3
                  rounded
                  text-xs
                  max-w-full
                  md:text-sm
                  overflow-x-auto
                  whitespace-pre-wrap
                  break-all
                  max-h-[200px]
                "
              >
                {selectedsubmission.error}
              </pre>
            </div>
          )}

        </div>
      </ScrollArea>
    )}
  </SheetContent>
</Sheet>



    </div>
  );
}

export default ProblemDesc2;
