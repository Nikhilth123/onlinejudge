import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/^\S+@\S+\.\S+$/, 'Please use a valid email address']

    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    role: {
    type: String,
    enum: ['user', 'admin'], 
    default: 'user' 
  },

  createdAt: {
    type: Date,
    default: Date.now 
  }


})

const User=mongoose.model('User',UserSchema);

export default User;
