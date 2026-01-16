import express from 'express';
import {SetAdmin} from '../Controller/SetAdmin.js';
import { recentproblems, totaluserandproblems } from '../Controller/Handleproblems.js';
const router = express.Router();

router.put('/setadmin',SetAdmin);
router.get('/recentproblems',recentproblems)
router.get('/totalusersandproblems',totaluserandproblems)
export default router;