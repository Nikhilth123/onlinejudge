import express from 'express';
import runcode from './routes/runcode.js';
import cors from 'cors';
import submitcode from './routes/submitcode.js'
import ai from './routes/ai.js'
import './cronecleaner.js'; 
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
  credentials: true
}));
console.log("Compiler Backend started");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/run',runcode);
app.use('/api/submit',submitcode);
app.use('/api/ai',ai);

app.listen(process.env.PORT||5000,'0.0.0.0',()=>console.log("server is running "));