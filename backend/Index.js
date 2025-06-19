import express from 'express';
import mongoose from 'mongoose';
import connectmongodb from './Connection.js'
import UserAuth from './Routes/UserAuth.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const app=express();

//connection with mongodb
const url=process.env.MONGO_URL;
connectmongodb(url)
.then(()=>console.log("connected to mongodb"))
.catch((err)=>console.log(console.err));


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use('/api/user',UserAuth);



app.listen(process.env.port,()=>console.log("server is running "));