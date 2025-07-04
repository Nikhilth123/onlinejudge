import express from 'express';

import handlesubmission from '../Controller/handlesubmission.js';
import handleusersubmission from '../Controller/handleusersubmission.js';
import authmiddlewares from '../Middlewares/authmiddlewares.js';

const router = express.Router();

router.post('/:problemId',authmiddlewares,handlesubmission);
router.get('/:problemId', authmiddlewares,handleusersubmission);
export default router;