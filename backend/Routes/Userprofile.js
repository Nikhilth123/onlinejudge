import { getUserProfile } from "../Controller/getuserprofile.js";
import express from "express";
const router = express.Router();

router.get('/', getUserProfile);

export default router;