import express from 'express';
import  {getAllProblems, getProblemById, addProblem, updateproblem, deleteproblem} from '../Controller/Handleproblems.js';
import adminmiddlewares from '../Middlewares/adminmiddlewares.js';

const router= express.Router();


router.get('/', getAllProblems);
router.get('/:id',getProblemById);
router.post('/addproblem',  addProblem,adminmiddlewares);
router.put('/:id', updateproblem,adminmiddlewares);
router.delete('/:id', deleteproblem,adminmiddlewares);
export default router;