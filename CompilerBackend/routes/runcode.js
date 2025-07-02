import express from 'express';
const router = express.Router();
import executecode from '../controllers/executecode.js';

router.post('', executecode);

export default router;
