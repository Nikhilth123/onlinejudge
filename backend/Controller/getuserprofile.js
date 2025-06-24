import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const getUserProfile = (req, res) => {
    const token = req.cookies.token;
    if (!token) {   
        return res.status(401).json({ msg: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.secretKey);
        
        res.status(200).json({ user: decoded, msg: "User profile retrieved successfully" });
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }   
}