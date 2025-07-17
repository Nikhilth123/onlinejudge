import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import UserSubmissions from '../Model/submissionschema.js'
import Problem from '../Model/Problemschema.js'
import User from '../Model/User.js';

export const getUserProfile =async (req, res) => {
    const token = req.cookies.token;
   
    if (!token) {   
       
        return res.status(401).json({ msg: "No token provided" });
    }
    try {
        let decoded = jwt.verify(token, process.env.secretKey);
        
        decoded=await User.findById(decoded.id).select('-password');
       
        
 
decoded=decoded.toObject()

         const solved = await UserSubmissions.aggregate([
    { $match: { userId: decoded._id, status: "Accepted" } },
    { $group: { _id: "$problemId" } },
    { $count: "solvedCount" }
  ]);

  const total = await Problem.countDocuments();

  decoded. questionsSolved=solved[0]?.solvedCount || 0
  decoded.totalQuestions=total;
        
        res.status(200).json({ user: decoded, msg: "User profile retrieved successfully" });
    } catch (err) {
        return res.status(500).json({ msg: "Invalid token" });
        
    }   
}

