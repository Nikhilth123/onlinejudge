import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import e from 'express';
dotenv.config();

const generateToken = (user) => {
    const token=jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role 
        }, process.env.secretKey,
        {
            expiresIn: '1d' 
            },
        );
        return token;
    };

    export default generateToken;