import express from "express";
import authmiddlewares from "../Middlewares/authmiddlewares.js";
import getsolvedproblems from "../Controller/getsolvedproblems.js";
const router = express.Router();

router.get('',authmiddlewares,getsolvedproblems);
export default router;