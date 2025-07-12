import express from 'express'
import multer from 'multer'
import handleprofilepicture from '../Controller/handleprofilepicture.js';
import authmiddlewares from '../Middlewares/authmiddlewares.js'
const router=express.Router();
const upload=multer({dest:'temp/'});
router.post('/picture',authmiddlewares,upload.single('profilepicture'),handleprofilepicture)
export default router