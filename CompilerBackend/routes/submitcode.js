import express from 'express'
import handlesubmitcode from '../controllers/handlesubmitcode';
const router=express.Router();
router.post('',handlesubmitcode);
export default router;