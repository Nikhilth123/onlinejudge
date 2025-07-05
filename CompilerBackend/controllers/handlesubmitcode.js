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
        let result='';
          
           
         switch (language) {
         
              case 'cpp':
             
                result = await executecpp(filepath, inputfilepath);
          
            console.log('hello bro');
          
             
                break;
              case 'py':
                
                result = await executepython(filepath, inputfilepath);
                               
                break;
              case 'c':
              
                result = await executec(filepath, inputfilepath);
                                 
                break;
              case 'js':
              
                result = await executejavascript(filepath, inputfilepath);
                                
                break;
              case 'java':
                 
                result = await executejava(filepath, inputfilepath);
                 
                break;
        
            }
console.log("expectedLines",expectedoutput);
console.log("actualLines",result);
            const expectedLines = expectedoutput.trim().split('\n');
const actualLines = result.output.trim().split('\n');

console.log("actual lines",result)
if(result.verdict!='Success'){
  return res.status(200).json({
    verdict:result.verdict,
    error:result.error,
    expectedoutput:'',
    output:'',
    time:result.time

  })
}



for (let i = 0; i < expectedLines.length; i++) {
  const actual=actualLines[i]?.trim();
  const expected=expectedLines[i]?.trim();
  if(expected!=actual){
    return res.status(200).json({
        verdict:'Wrong Answer',
        testcase:i+1,
        input:testCases[i].input,
        expectedoutput:expectedLines[i]?.trim(),
        output:actualLines[i]?.trim(),
        total:testCases.length,
        time:result.time,
    })
  }
}
return res.status(200).json({
verdict:'Accepted',
        testcase:testCases.length,
        output:'',
        expectedoutput:'',
        total:testCases.length,
        time:result.time,
})



    }
    catch(err){
      console.log('hello i am here ')
         return res.status(200).json({
      message: "Code execution failed",
      errorType: err.type || "Unknown Error",
      error: err.error || err.message || "Something went wrong"

    });
    }
}
export default handlesubmitcode;