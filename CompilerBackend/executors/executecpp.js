import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import formatcpperror from '../formaterrors/formatcpperror.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diroutput=path.join(__dirname, '..',"outputs");  

if(!fs.existsSync(diroutput)){
    fs.mkdirSync(diroutput, { recursive: true });
}

const executecpp=(filepath,inputfilepath)=>{
    return new Promise((resolve,reject)=>{
    const jobid = path.basename(filepath).split('.')[0];
    const outputfile=path.join(diroutput,`${jobid}.out`);
    const compilecmd=`g++ "${filepath}" -o "${outputfile}"`;
    const start=Date.now();
    exec(compilecmd,{shell:true},(compileerr,_,compilestderr)=>{
        if(compileerr){
            return resolve({
                verdict:'Compilation Error',
                output:'',
                error:formatcpperror(compilestderr||compileerr.message),
                time:0
            });
        }
        const runcmd=`"${outputfile}" < "${inputfilepath}"`
        exec(runcmd,{shell:true,timeout:2000},(runerr,runstdout,runstderr)=>{
            const end=Date.now();
            const time=end-start;
            if(runerr){
                if(runerr.killed){
                return resolve({
                    verdict:'Time Limit Exceeded',
                    output:'',
                    error:'Time Limit Exceeded',
                    time:time,
                })
            }
            return resolve({
                verdict:'Runtime Error',
                output:runstdout.trim(),
                error:formatcpperror(runstderr||runerr.message),
                time:time,
            })
            }
            return resolve({
                verdict:'Success',
                output:runstdout.trim(),
                time:time,
                error:''
            });
        })
    })
})
}
export default executecpp;