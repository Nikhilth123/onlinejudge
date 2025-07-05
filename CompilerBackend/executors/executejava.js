import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import formatjavaerror from '../formaterrors/formatjavaerror.js';

const executejava = (filepath, inputfilepath) => {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filepath);               // Folder containing Main.java
    const classname = path.basename(filepath, '.java'); // e.g., "Main"
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

        // Optional: save output to file
        const outputDir = path.join(dir, '..', 'outputs');
        const jobId = path.basename(dir); // the UUID
        const outputPath = path.join(outputDir, `${jobId}.txt`);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        fs.writeFileSync(outputPath, runStdout);

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
