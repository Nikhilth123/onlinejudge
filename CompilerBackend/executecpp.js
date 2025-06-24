import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputpath = path.join(__dirname, 'outputs');
if (!fs.existsSync(outputpath)) {
  fs.mkdirSync(outputpath, { recursive: true });
}

const executecpp = async (filepath) => {
  const jobid = path.basename(filepath).split('.')[0]; 
  const outputFilePath = path.join(outputpath, `${jobid}.out`);

  return new Promise((resolve, reject) => {

    const command = `g++ "${filepath}" -o "${outputFilePath}" && "${outputFilePath}"`;
    console.log("Compiling & Running:", command);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(` Compile error: ${error.message}`);
      }
      if (stderr) {
        return reject(`Runtime stderr: ${stderr}`);
      }
      resolve(stdout); 
    });
  });
};

export default executecpp;
