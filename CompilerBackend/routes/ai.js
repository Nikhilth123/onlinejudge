import express from 'express'
import useai from '../controllers/useai.js'
 const router=express.Router()

 router.post('/help',useai);
 export default router