import mongoose from "mongoose";
import express from "express";
import {handleusersignup,handleuserlogin,handleuserlogout} from "../Controller/Auth.js";


const router=express.Router();

router.post('/login',handleuserlogin);
router.post('/signup',handleusersignup);
router.get('/logout',handleuserlogout);

export default router;

