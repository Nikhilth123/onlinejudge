import express from 'express';

import handlesubmission from '../Controller/handlesubmission.js';
import handleusersubmission, { handleusertotalsubmissions } from '../Controller/handleusersubmission.js';
import authmiddlewares from '../Middlewares/authmiddlewares.js';
import handleusersubmissionbysubmissionid from '../Controller/handleusersubmissionbysubmissionid.js'
const router = express.Router();

router.post('/:problemId',authmiddlewares,handlesubmission);
router.get('/:problemId', authmiddlewares,handleusersubmission);
router.get('/code/:id',authmiddlewares,handleusersubmissionbysubmissionid)
router.get('/user/totalsubmissions',authmiddlewares,handleusertotalsubmissions)
export default router;