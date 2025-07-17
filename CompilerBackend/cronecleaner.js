import cron from 'node-cron';
import fs from 'fs';
import path from 'path';

const foldersToClean = [
    './codes',
    './inputs',
    './outputs'
];

function cleanFolder(folderPath) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(`Failed to read ${folderPath}:`, err);
            return;
        }

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            fs.unlink(filePath, (err) => {
                if (err) console.error(`Failed to delete ${filePath}:`, err);
                else console.log(`Deleted: ${filePath}`);
            });
        }
    });
}

cron.schedule('0 * * * *', () => {
    console.log('Cron job running: Cleaning all folders...');
    for (const folder of foldersToClean) {
        cleanFolder(folder);
    }
});
