import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import formatjavascripterror from '../formaterrors/formatjavascripterror.js';

const executejavascript=(filepath,inputfilepath)=>{
    return new Promise((resolve,reject)=>{
        const runcmd=`node "${filepath}" < "${inputfilepath}"`
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
                error:formatjavascripterror(runstderr||runerr.message),
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
export default executejavascript;