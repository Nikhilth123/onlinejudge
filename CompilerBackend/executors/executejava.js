import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

const executejava = (filepath, inputfilepath) => {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filepath);               // Folder containing Main.java
    const classname = path.basename(filepath, '.java'); // e.g., "Main"
    const compilecmd = `javac "${filepath}"`;

    exec(compilecmd, { shell: true }, (compileErr, _, compileStderr) => {
      if (compileErr) {
        return reject({
          type: 'Compilation Error',
          error: compileStderr || compileErr.message,
        });
      }

      const runCmd = `java -cp "${dir}" ${classname} < "${inputfilepath}"`;

      exec(runCmd, { shell: true, timeout: 5000 }, (runErr, runStdout, runStderr) => {
        if (runErr) {
          return reject({
            type: 'Runtime Error',
            error: runStderr || runErr.message,
          });
        }

        // Optional: save output to file
        const outputDir = path.join(dir, '..', 'outputs');
        const jobId = path.basename(dir); // the UUID
        const outputPath = path.join(outputDir, `${jobId}.txt`);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        fs.writeFileSync(outputPath, runStdout);

        resolve(runStdout);
      });
    });
  });
};

export default executejava;
