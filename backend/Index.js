import express from 'express';
import mongoose from 'mongoose';
import connectmongodb from './Connection.js'
import UserAuth from './Routes/UserAuth.js';
import Userprofile from './Routes/Userprofile.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Problems from './Routes/Problems.js';
import cors from 'cors';
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
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use('/api/user',UserAuth);
app.use('/api/user/me',Userprofile);
app.use('/api/problems',Problems);


app.listen(process.env.port,()=>console.log("server is running "));