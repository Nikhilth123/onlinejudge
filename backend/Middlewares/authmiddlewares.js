import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const protect = (req, res, next) => {
 const token=req.cookies.token;
 if(!token) return res.status(401).json({ msg: "No token provided" });
    try {
      const decoded = jwt.verify(token, process.env.secretKey);
      req.user = decoded; 
      console.log("decoded",decoded);
      next();
    } 
    catch (err) {
      return res.status(401).json({ msg: "Invalid token" });
    }
};

export default protect;
