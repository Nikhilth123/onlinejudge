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
import uploadprofilepic from './Routes/uploadprofilepic.js'
import solvedproblems from './Routes/solvedproblems.js';
import './cronecleaner.js';

dotenv.config();

const app = express();


const url = `${process.env.MONGO_URL}`;
connectmongodb(url)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(console.err));

app.use(cors({
  origin: process.env.FRONTEND_URL,
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
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', UserAuth);
app.use('/api/user/me', Userprofile);
app.use('/api/problems', Problems);
app.use('/api/admin', Admin);
app.use('/api/submission', submission);
app.use('/api/submit', submission);
app.use('/api/code', SaveDraft);
app.use('/api/profile', uploadprofilepic)
app.use('/api/user/solvedproblems', solvedproblems);


app.listen(process.env.port || 8000, () => console.log("server is running "));