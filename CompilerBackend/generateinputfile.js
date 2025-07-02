import fs from 'fs';
import path from 'path';
import {v4 as uuid} from 'uuid'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirinputs=path.join(__dirname,"inputs");  

if(!fs.existsSync(dirinputs)){
    fs.mkdirSync(dirinputs, { recursive: true });
}

const generateinputfile=(inputs)=>{
const jobid=uuid();
const filename=`${jobid}.txt`;
const inputfilePath=path.join(dirinputs,filename)

fs.writeFileSync(inputfilePath,inputs)
return inputfilePath;
}
export default generateinputfile;