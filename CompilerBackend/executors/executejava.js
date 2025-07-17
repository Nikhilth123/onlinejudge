import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import formatjavaerror from '../formaterrors/formatjavaerror.js';

const executejava = (filepath, inputfilepath) => {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filepath);              
    const classname = path.basename(filepath, '.java'); 
    const compilecmd = `javac "${filepath}"`;
const start=Date.now();
    exec(compilecmd, { shell: true }, (compileErr, _, compileStderr) => {
      if (compileErr) {
        return resolve({
          verdict: 'Compilation Error',
          error: formatjavaerror(compileStderr || compileErr.message),
        });
      }

      const runCmd = `java -cp "${dir}" ${classname} < "${inputfilepath}"`;

      exec(runCmd, { shell: true, timeout: 2000 }, (runErr, runStdout, runStderr) => {
        const end=Date.now();
        const time=start-end;
        if (runErr) {
                if(runErr.killed){
                return resolve({
                    verdict:'Time Limit Exceeded',
                    output:'',
                    error:'Time Limit Exceeded',
                    time:time,
                })
            }
            return resolve({
                verdict:'Runtime Error',
                output:runStdout,
                error:formatjavaerror(runStderr||runErr.message),
                time:time,
            })
            }

       

         return resolve({
                verdict:'Success',
                output:runStdout,
                time:time,
                error:''
            });
      });
    });
  });
};

export default executejava;