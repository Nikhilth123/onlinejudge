import express from 'express';
import saveuserdraftcode from '../Controller/saveuserdraftcode.js';
import getuserdraftcode from '../Controller/getuserdraftcode.js';
import authmiddlewares from '../Middlewares/authmiddlewares.js';
const router = express.Router();   
router.post('/savedraft/:problemId', authmiddlewares,saveuserdraftcode) 
router.post('/getdraft/:problemId',authmiddlewares,getuserdraftcode)
export default  router;