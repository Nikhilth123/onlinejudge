import fetch from 'node-fetch';

const verifycookie = async (cookie) => {
    try {
        const res = await fetch(`http://localhost:8000/api/user/me`, {
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
