import express from 'express';
import runcode from './routes/runcode.js';
import cors from 'cors';


const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/run',runcode);

app.listen(5000,()=>console.log("server is running "));