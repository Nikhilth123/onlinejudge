import express from 'express';
import generateFile from './generateFile.js';
import  executecpp from './executecpp.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/run', async(req, res) => {
    const { code, language='cpp' } = req.body;

if(!code) {
        return res.status(400).json({ message: 'Code is required' });
    }
   try{
    const filepath=generateFile(language,code);
    const output=await executecpp(filepath)
    res.json(filepath);
   }catch(err){
    res.status(500).json({ message: 'Error processing code', error: err.message });
   }
});

app.listen(5000,()=>console.log("server is running "));