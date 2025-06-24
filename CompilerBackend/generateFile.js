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
const filename=`${jobid}.${language}`;
const filePath=path.join(dirCodes,filename)
fs.writeFileSync(filePath,code)
return filePath;
}
export default generateFile;