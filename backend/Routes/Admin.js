import express from 'express';
const router = express.Router();
import { SetAdmin } from '../Controller/SetAdmin.js';  
router.put('/setadmin',SetAdmin);

export default router;