import UserSubmissions from '../Model/submissionschema.js'
import mongoose from 'mongoose';
const handleusersubmissionbysubmissionid=async(req,res)=>{
    const {id}=req.params;
    if(!id)return res.status(400).json({msg:'id is required'});
    try{
        const data=await UserSubmissions.findById(id);
        if(!data)return res.status(400).json({msg:'no submission for this id'})
        return res.status(200).json(data);


    }
    catch(err){ 
        return res.status(400).json({msg:'server error please check'});
    }
}
export default handleusersubmissionbysubmissionid