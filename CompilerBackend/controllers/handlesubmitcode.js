import generateFile from "../generateFile.js";
import generateinputfile from "../generateinputfile.js";
import executecpp from "../executors/executecpp.js";
import executejava from "../executors/executejava.js";
import executejavascript from "../executors/executejavascript.js";
import executepython from "../executors/executepython.js";
import executec from "../executors/executec.js";

const handlesubmitcode = async (req, res) => {
    const {testCases,code,language}=req.body;
    
    if(!code||!language){
        return res.status(401).json({msg:'can be executed',error:'no code or language'})
    }
    if(!testCases||!Array.isArray(testCases)||testCases.length===0){
        return res.status(401).json({msg:'can be executed',error:'no testcases provided'})
    }
    try{
      
        const input=`${testCases.length}\n`+testCases.map(tc=>(tc.input.trim())).join('\n');
        const inputfilepath=generateinputfile(input);
        const expectedoutput=testCases.map(tc=>(tc.Output.trim())).join('\n');
        const filepath=generateFile(language,code);
        let output='';
            let executiontime;
            let start;
            let end;
         switch (language) {
              case 'cpp':
                start=Date.now();
                output = await executecpp(filepath, inputfilepath);
                 end=Date.now();
                executiontime=end-start;
                break;
              case 'py':
                  start=Date.now();
                output = await executepython(filepath, inputfilepath);
                                 end=Date.now();
                executiontime=end-start;
                break;
              case 'c':
                  start=Date.now();
                output = await executec(filepath, inputfilepath);
                                 end=Date.now();
                executiontime=end-start;
                break;
              case 'js':
                 start=Date.now();
                output = await executejavascript(filepath, inputfilepath);
                                 end=Date.now();
                executiontime=end-start;
                break;
              case 'java':
                 start=Date.now();
                output = await executejava(filepath, inputfilepath);
                 end=Date.now();
                executiontime=end-start;
                break;
        
            }
console.log("expectedLines",expectedoutput);
console.log("actualLines",output);
            const expectedLines = expectedoutput.trim().split('\n');
const actualLines = output.trim().split('\n');




for (let i = 0; i < expectedLines.length; i++) {
  const actual=actualLines[i]?.trim();
  const expected=expectedLines[i]?.trim();
  if(expected!=actual){
    return res.status(200).json({
        verdict:'Wrong Answer',
        testcase:i+1,
        input:testCases[i].input,
        expectedoutput:expectedLines[i]?.trim(),
        actualoutput:actualLines[i]?.trim(),
        total:testCases.length,
        time:executiontime
    })
  }
}
return res.status(200).json({
verdict:'Accepted',
        testcase:testCases.length,
        total:testCases.length,
        time:executiontime
})



    }
    catch(err){
         return res.status(200).json({
      message: "Code execution failed",
      errorType: err.type || "Unknown Error",
      error: err.error || err.message || "Something went wrong"

    });
    }
}
export default handlesubmitcode;