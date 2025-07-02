import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';




const executepython=(filepath,inputfilepath)=>{
    return new Promise((resolve,reject)=>{
   
        const runcmd=`python3 "${filepath}" < "${inputfilepath}"`
        exec(runcmd,{shell:true,timeout:2000},(runerr,runstdout,runstderr)=>{
            if(runerr){
                return reject({
                    type:'Runtime error',
                    error:runstderr||runerr.message
                })
            }
            resolve(runstdout);
        })
    })

}
export default executepython;