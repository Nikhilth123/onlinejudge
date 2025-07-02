import executecpp from './executors/executecpp.js';
import executejava from './executors/executejava.js';
import executepython from './executors/executepython.js';
import executejavascript from './executors/executejavascript.js';
import executec from './executors/executec.js';
import generateFile from './generateFile.js';
import generateinputfile from './generateinputfile.js';
import verifycookie from './verifycookie.js';


const executecode=async(req,res)=>{
  const cookie=req.headers.cookie;
  console.log(cookie);
 
  if(!cookie){
    return res.status(401).json({msg:"Please login to run code",err:"Unauthorized"});
  }
  const user=await verifycookie(cookie);
  if(!user){
    return res.status(401).json({msg:"Please login to run code",err:"Unauthorized"});
  }
  const {code,language,input}=req.body;
  if(!code){
    return res.status(401).json({msg:"write code then submit"});
  }
  try{
  let output='';
  const filepath=generateFile(language,code);
  const inputfilepath=generateinputfile(input);
  switch(language){
    case 'cpp':
      output=await executecpp(filepath,inputfilepath);
      break;
      case 'py':
        output=await executepython(filepath,inputfilepath);
        break;
        case 'c':
          output=await executec(filepath,inputfilepath);
          break;
          case 'js':
            output=await executejavascript(filepath,inputfilepath);
            break;
            case 'java':
              output=await executejava(filepath,inputfilepath);
              break;

  }
  
  return res.status(200).json({output});
  
}
catch(err){
  return res.status(400).json({
      message: "Code execution failed",
      errorType: err.type || "Unknown Error",
      error: err.error || err.message || "Something went wrong"

});
  
}
}
export default executecode;