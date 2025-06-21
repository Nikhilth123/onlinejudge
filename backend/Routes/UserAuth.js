import mongoose from "mongoose";
import express from "express";
import {handleusersignup,handleuserlogin,handleuserlogout} from "../Controller/Auth.js";


const router=express.Router();

router.post('/login',handleuserlogin);
router.post('/signup',handleusersignup);
router.post('/logout',handleuserlogout);

export default router;

