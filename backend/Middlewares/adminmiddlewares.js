import jwt from 'jsonwebtoken';

const adminMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ msg: "No token provided" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        if (decoded.role !== 'admin') {
        return res.status(403).json({ msg: "Access denied, admin only" });
        }
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }   
}
export default adminMiddleware;