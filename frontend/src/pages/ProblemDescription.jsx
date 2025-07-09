import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Editor from "@monaco-editor/react";
import Split from 'react-split';
import { useRef } from 'react';
import Authcontext from '../../context/Authcontext';
import debounce from 'lodash/debounce';

function ProblemDescription() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error,seterror]=useState('')
  const [airesponse,setairesponse]=useState('');
  const {user}=useContext(Authcontext);
  const localkey=`code-${user?.id||'guest'}-${id}-${language}`;


  const handleairesponse=async(task)=>{
    const payload={
      language:language,
      code:code,
      question:data.description+data.inputFormat,
      error:error,
      task:task
    }
    try{
      const res=await fetch(`http://localhost:5000/api/ai/help`,{
        method:'POST',
       headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify(payload)
      })
      if(!res.ok){
         const result=await res.json()
        console.log("error in fetching try again",result.error)

      }
      else{
      const result=await res.json()
      console.log(result)
      setairesponse(result)
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
      console.log("userid=",user.id);
      await fetch(`http://localhost:8000/api/code/savedraft/${id}`,{
        method:'POST',
         headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId, id, language, code: newcode }),
      })
    }
  },2000);
 


const outputref=useRef(null);

const handlesubmit=async()=>{
  try{
    const payload={
      code:code,
      language:language,
    }
    const res=await fetch(`http://localhost:8000/api/submit/${id}`,{
      method:'POST',
      credentials:'include',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(payload)
    })
    
    if(!res.ok){
      const result=await res.json();
      setOutput("Server Error Try again");
      setIsError(true);

    }
   else {
    const result=await res.json();
    if(result.verdict!='Wrong Answer'&& result.verdict!='Success'){
      const formatted=`
      Verdict: ${result.verdict}
      time:${result.time}
      error:${result.error}

      `
      setOutput(formatted);
      if(result.verdict!='Wrong Answer')seterror(result.error)
      setIsError(true);
    }
else{
     const formatted = `
Verdict: ${result.verdict}
Test Case: ${result.testcase}
Input:
${result.input}

Expected Output:
${result.expectedoutput}

Your Output:
${result.output}

Total Test Cases: ${result.total}
Execution Time: ${result.time} ms
      `.trim();
        setOutput(formatted);
        if(result.verdict=='Wrong Answer')
        setIsError(true);
      else setIsError(false);
      }
    
      setShowOutput(true);
      setTimeout(() => {
  outputref.current?.scrollIntoView({ behavior: 'smooth' });
}, 100);
  }
}
  catch(err){
       console.log(err);
      toast.error("Execution failed");
      setOutput("Execution failed: " + (err.message || "Unknown error"));
      setIsError(true);
      setShowOutput(true);
  }
}

  const handleRun = async () => {
    try {
      const payload = {
        code,
        language,
        input: data.sampleInput
      };

      const res = await fetch(`http://localhost:5000/api/run`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.msg || "Execution error");
        setOutput(result.error || "An error occurred.");
        setIsError(true);
        
      } else {
        setOutput(result.output || result.error || "No output");
        setIsError(!!result.error);
        
      }
      setShowOutput(true);
      setTimeout(() => {
  outputref.current?.scrollIntoView({ behavior: 'smooth' });
}, 100);
    } catch (err) {
      console.log(err);
      toast.error("Execution failed");
      setOutput("Execution failed: " + (err.message || "Unknown error"));
     
      setIsError(true);
      setShowOutput(true);
    }
  };

  const handleClearOutput = () => {
    setOutput('');
   
    setShowOutput(false);
    setIsError(false);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/problems/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.msg);
      } else {
        setData(result);
        toast.success("Problem loaded");
      }
    } catch (err) {
      toast.error('Failed to fetch problem');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
   
    const handleEditorChange = (value) => {
    setCode(value);
  saveCode(value);
  };

   useEffect(() => {
    const loadDraft = async () => {
      const local = localStorage.getItem(localkey);
      setCode(local || '');

      if (user?.id) {
        const userId=user?.id
        const res = await fetch(`http://localhost:8000/api/code/getdraft/${id}`, {
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
      setCode(local||'')
    };
    loadDraft();
  }, [user, id, language]);
  const navigate=useNavigate();

  const handlesubmission=()=>{
    navigate(`/submission/${id}`)
  }

  return (
    <div className="h-screen w-minscreen overflow-hidden">
      <Split
        direction="horizontal"
        sizes={[50, 50]}
        gutterSize={10}
        className="w-full h-full flex"
      >
        {/* Left: Problem Description */}
        <div className="bg-gray-100  overflow-auto">
            {user&&(
          <button onClick={handlesubmission} className='bg-red-400 px-2 py-2 rounded mx-5 border-1'>submission</button>
)}
        <select
         onChange={(e)=>{handleairesponse(e.target.value)}}
        className="border p-2 rounded  bg-gray-400 mx-4"
        
        defaultValue=""
        >
          <option value=''disabled>TakeAiHelp</option>
          {!code?.trim() && (
  <option value='boilerplate'>boilerplate</option>
)}
          <option value='code optimization'>codeoptimize</option>
          <option value='codeexplanation'>codeexplanation</option>
        </select>
        <div className="bg-gray-100 p-4 overflow-auto">
        
          <h1 className="text-xl font-bold">{data.title}</h1>
          <p className="text-sm text-gray-600">{data.difficulty}</p>

          <h2 className="font-semibold mt-4">Description</h2>

          <p className="whitespace-pre-wrap">{data.description}</p>
          <button className='bg-amber-300 px-3 py-2 rounded' onClick={()=>handleairesponse('hints')}>AskHints</button>
         
          <h2 className="font-semibold mt-4" >Input Format</h2>
          <p>{data.inputFormat}</p>

          <h2 className="font-semibold mt-4" >Output Format</h2>
          <p>{data.outputFormat}</p>


          <h2 className="font-semibold mt-4">Constraints</h2>
          <p>{data.constraints}</p>

          <h2 className="font-semibold mt-4">Sample Input</h2>
          <pre className="bg-white border p-2 rounded">{data.sampleInput}</pre>

          <h2 className="font-semibold mt-4">Sample Output</h2>
          <pre className="bg-white border p-2 rounded">{data.sampleOutput}</pre>
        </div>

        {/*ai response*/}
          {airesponse && (
  <div className='bg-slate-100 my-2 p-3 rounded border'>
    <h3 className="font-bold">AI Help:</h3>
    <textarea
  value={airesponse}
  readOnly
  rows={50}
  className="w-full p-2 border rounded bg-white text-sm font-mono resize-y overflow-auto"
/>
  </div>
)}


        </div>


        {/* Right: Editor and Output stacked */}
        <div className="flex flex-col h-full bg-white border-l border-gray-300">
          <div className="p-2 flex justify-between items-center border-b">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border p-1 rounded"
            >
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="py">Python</option>
              <option value="js">JavaScript</option>
              <option value="c">C</option>
            </select>
            <div>
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              onClick={handleRun}
            >
              Run
            </button>
             <button
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 mx-5"
              onClick={handlesubmit}
            >
              submit
            </button>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-grow border-r border-gray-300 overflow-hidden pr-6">
            <Editor
              height="90%"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={handleEditorChange }
              options={{
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                minimap: { enabled: false },
                scrollbar: {
                  horizontal: 'hidden',
                }
              }}
            />
          </div>

          {/* Output Box below editor */}
         {showOutput && (
  <div  ref={outputref} className="bg-gray-50 p-4 border-t border-gray-300">
    <div className="flex justify-between items-center mb-2">
      <label className="block text-sm font-medium text-gray-700">
        Output
      </label>
      <button className='text-sm text-red-600 hover:underline mx-3'
      onClick={()=>handleairesponse('whyerror')}
      >whyerror</button>
      <button
        onClick={handleClearOutput}
        className="text-sm text-red-600 hover:underline"
      >
        Clear Output
      </button>
    </div>
    <textarea
      readOnly
      value={output}
      rows={10}
      className={`w-full p-2 border rounded font-mono text-sm resize-none overflow-auto ${
        isError
          ? 'text-red-600 border-red-400 bg-red-50'
          : 'text-green-700 border-green-400 bg-green-50'
      }`}
    />
  </div>
)}

        </div>
      </Split>
    </div>
  );
}

export default ProblemDescription; 