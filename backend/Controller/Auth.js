import User from "../Model/User.js";
import bcrypt from "bcrypt";
import generateToken from "../Utils/generatetoken.js";

export const handleusersignup=async(req,resp)=>{
    const {name,email,password,role='user'}=req.body;
    if(!name||!email||!password||!role){   
       return resp.status(400).json({msg:"Enter all fields with valid credentials"});
    }
   
     if (password.length < 6){
      
    return resp.status(400).json({ msg: "Password must be at least 6 characters long" });
  }

     const existingUser = await User.findOne({ email });
  if (existingUser) {
    return resp.status(409).json({ msg: "User already exists" });
  }

  const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newuser=new User({
        name:name,
        email:email,
        password:hashedPassword,
        role:role,
    })
    await User.create(newuser);
    const token = generateToken(newuser); 
    const {password:pw,...userWithoutPassword} = newuser.toObject();    
    resp.status(201).cookie("token", token, {
      httpOnly: true,  
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, 
    }).json({user:userWithoutPassword, msg: "User created successfully" });


}

export const handleuserlogin=async(req,resp)=>{
    const {email,password}=req.body;
    if(!email||!password){
        resp.status(400).json({msg:"Enter all fields with valid credentials"});
    }
    const user=await User.findOne({email});
    if(!user){
        return resp.status(400).json({msg:"User not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return resp.status(400).json({msg:"Invalid Password"});
    }
    const token = generateToken(user);
    const {password:pw,...userWithoutPassword} = user.toObject();
   
    resp.status(200).cookie("token", token, {
      httpOnly: true,   
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, 
    }).json({user:userWithoutPassword, msg: "Login successful" });
}

export const handleuserlogout=(req,resp)=>{
    try {resp.clearCookie("token",{
    httpOnly: true,
    secure: false,       
    sameSite: "Strict"
  });
    return resp.status(200).json({msg:"User logged out successfully"});
}catch(err){
  
    return resp.status(500).json({ msg: "Logout failed", error: error.message });
}
}

