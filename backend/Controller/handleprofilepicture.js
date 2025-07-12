import cloudinary from "../Utils/cloudinary.js";
import fs from 'fs'
import User from '../Model/User.js'

const handleprofilepicture=async(req,res)=>{
    try{
    const filepath=req.file.path;
    const result=cloudinary.uploader.upload(filepath,{
        folder:'profile-pics',
        width:300,
        height:300,
        crop:limit
    });
   fs.unlinkSync(filepath);
   const user=await User.findByIdAndUpdate(
    req.user.id,
    {profilepic:result.secure_url},
    {new:true}
   )
   req.status(200).json({url:user.profilepic})
}
catch(err){
        res.status(500).json({ message: 'Upload failed' });
}
}
export default handleprofilepicture;