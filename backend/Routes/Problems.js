import express from 'express';
import  {getAllProblems, getProblemById, addProblem, updateproblem, deleteproblem} from '../Controller/Handleproblems.js';
import adminmiddlewares from '../Middlewares/adminmiddlewares.js';
import multer from 'multer';
const upload=multer({dest:"uploads/"})

const router= express.Router();


router.get('/', getAllProblems);
router.get('/:id',getProblemById);
router.post('/addproblem',  upload.single("testCasesFile"), adminmiddlewares,addProblem,);
router.put('/edit/:id',adminmiddlewares,updateproblem,);
router.delete('/delete/:id',adminmiddlewares, deleteproblem);
export default router;