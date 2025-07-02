import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diroutput=path.join(__dirname,'..',"outputs");  

if(!fs.existsSync(diroutput)){
    fs.mkdirSync(diroutput, { recursive: true });
}

const executec=(filepath,inputfilepath)=>{
    return new Promise((resolve,reject)=>{
    const jobid = path.basename(filepath).split('.')[0];
    const outputfile=path.join(diroutput,`${jobid}.out`);
    const compilecmd=`gcc "${filepath}" -o "${outputfile}"`;
    exec(compilecmd,{shell:true},(compileerr,_,compilestderr)=>{
        if(compileerr){
            return reject({
                type:'compilation error',
                error:compilestderr||compileerr.message
            });
        }
        const runcmd=`"${outputfile}" < "${inputfilepath}"`
        exec(runcmd,{shell:true,timeout:2000},(runerr,runstdout,runstderr)=>{
            if(runerr){
                return reject({
                    type:'Runtime error',
                    error:runerr.message||runstderr
                })
            }
            resolve(runstdout);
        })
    })
})
}
export default executec;