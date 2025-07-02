import express from 'express';
const router=express.Router();
import executecode from '../executecode.js';

router.post('',executecode);

export default router;
