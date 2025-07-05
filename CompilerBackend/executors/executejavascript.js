import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';


const executejavascript=(filepath,inputfilepath)=>{
    return new Promise((resolve,reject)=>{
        const runcmd=`node "${filepath}" < "${inputfilepath}"`
        exec(runcmd,{shell:true,timeout:2000},(runerr,runstdout,runstderr)=>{
            if(runerr){
                if(runerr.killed){
                return resolve({
                    verdict:'Time Limit Exceeded',
                    output:'',
                    error:runstderr||runerr.message,
                    time:time,
                })
            }
            return resolve({
                verdict:'Runtime Error',
                output:runstdout,
                error:runstderr||runerr.message,
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