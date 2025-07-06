import express from 'express';
import mongoose from 'mongoose';
import connectmongodb from './Connection.js'
import UserAuth from './Routes/UserAuth.js';
import Userprofile from './Routes/Userprofile.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Problems from './Routes/Problems.js';
import cors from 'cors';
import Admin from './Routes/Admin.js'
import submission from './Routes/submission.js';
import SaveDraft from './Routes/SaveDraft.js';


dotenv.config();

const app=express();
  
//connection with mongodb
const url=process.env.MONGO_URL;
connectmongodb(url)
.then(()=>console.log("connected to mongodb"))
.catch((err)=>console.log(console.err));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use((req, res, next) => {

  if (req.headers['content-type']?.includes('application/json')) {
    express.json()(req, res, next);
  } else {
    next();
  }
});

app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use('/api/user',UserAuth);
app.use('/api/user/me',Userprofile);
app.use('/api/problems',Problems);
app.use('/api/admin',Admin);
app.use('/api/submission',submission);
app.use('/api/submit',submission);
app.use('/api/code',SaveDraft);


app.listen(process.env.port,()=>console.log("server is running "));