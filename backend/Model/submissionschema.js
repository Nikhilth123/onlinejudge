import mongoose from "mongoose";



const usersubmissions = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },

  language: { type: String, required: true },
  code: { type: String, required: true },

  status: {
    type: String,
    enum: ["Accepted", "Wrong Answer", "Runtime Error", "Compilation Error", "Time Limit Exceeded"],
    default: "Pending",
  },
  expectedoutput:{type:String},
  output:{type:String},
  executionTime: Number, 
  error: String, 
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("UserSubmissions", usersubmissions);
