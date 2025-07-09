import express from 'express';
import runcode from './routes/runcode.js';
import cors from 'cors';
import submitcode from './routes/submitcode.js'
import ai from './routes/ai.js'

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/run',runcode);
app.use('/api/submit',submitcode);
app.use('/api/ai',ai);

app.listen(5000,()=>console.log("server is running "));