import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const verifycookie = async (cookie) => {
    
    try {
       
        const res = await fetch(`${process.env.AUTHBACKEND_URL}/api/user/me`, {
            method: 'GET',
            headers: {
                cookie: cookie,
            },
            credentials: 'include' 
        });

        const data = await res.json(); 

        if (!res.ok) {
            return {
                success: false,
                error: data.message || 'Request failed'
            };
        } else {
           
            return {
                success: true,
                user: data.user
            };
        }
    } catch (err) {
       
        return {
            success: false,
            msg: "Internal Server Error",
            err: err.message || "Something went wrong"
        };
    }
};

export default verifycookie;
