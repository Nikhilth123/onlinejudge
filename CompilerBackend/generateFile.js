import fs from 'fs';
import path from 'path';
import {v4 as uuid} from 'uuid'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirCodes=path.join(__dirname,"codes");  

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, { recursive: true });
}
const generateFile=(language,code)=>{
const jobid=uuid();

if(language==='java'){
   const match = code.match(/public\s+class\s+(\w+)/);
        if (!match) {
            throw new Error("No public class found in Java code.");
        }
        const className = match[1];
    const jobDir = path.join(dirCodes, jobid);
  const filePath = path.join(jobDir, `${className}.java`);
    fs.mkdirSync(jobDir, { recursive: true }); 
    fs.writeFileSync(filePath, code);
    return filePath;
}

else{
    if(language=='python')language='py'
    else if(language=='javascript')language='js'
const filename=`${jobid}.${language}`;
const filePath=path.join(dirCodes,filename)

fs.writeFileSync(filePath,code)
return filePath;
}

}
export default generateFile;