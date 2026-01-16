import express from 'express';
const router = express.Router();
import executecode from '../controllers/executecode.js';
console.log("In runcode routes");
router.post('/code', executecode);

export default router;
