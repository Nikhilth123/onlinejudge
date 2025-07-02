import express from 'express';
import {SetAdmin} from '../Controller/SetAdmin.js';
const router = express.Router();

router.put('/setadmin',SetAdmin);

export default router;