import cron from 'node-cron';
import fs from 'fs';
import path from 'path';


function isOlderThan10Minutes(filePath) {
  const stats = fs.statSync(filePath);
  const now = Date.now();
  const fileTime = new Date(stats.mtime).getTime();
  return (now - fileTime) > 10 * 60 * 1000; 
}

cron.schedule('* * * * *', () => {
  const folders = ['temp', 'uploads'];
  folders.forEach((folder) => {
    const dirPath = path.join(process.cwd(), folder);

    if (fs.existsSync(dirPath)) {
      fs.readdir(dirPath, (err, files) => {
        if (err) {
          console.error(`Error reading ${folder}:`, err);
          return;
        }

        files.forEach((file) => {
          const filePath = path.join(dirPath, file);
          try {
            if (isOlderThan10Minutes(filePath)) {
              fs.unlinkSync(filePath);
              console.log(`Deleted old file: ${filePath}`);
            }
          } catch (err) {
            console.error(`Failed to delete ${filePath}:`, err);
          }
        });
      });
    }
  });
});
