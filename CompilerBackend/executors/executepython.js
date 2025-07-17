import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import formatpythonerror from '../formaterrors/formatpythonerror.js';



const executepython=(filepath,inputfilepath)=>{
    return new Promise((resolve,reject)=>{
   
        const runcmd=`python3 "${filepath}" < "${inputfilepath}"`
        const start=Date.now();
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
                output:runstdout,
                error:formatpythonerror(runstderr||runerr.message),
                time:time,
            })
            }
            return resolve({
                verdict:'Success',
                output:runstdout,
                time:time,
                error:''
            });
        })
    })

}
export default executepython;