import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';


const executejavascript=(filepath,inputfilepath)=>{
    return new Promise((resolve,reject)=>{
        const runcmd=`node "${filepath}" < "${inputfilepath}"`
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

}
export default executejavascript;