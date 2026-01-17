import { json } from "express";
import Problem from "../Model/Problemschema.js";
import fs from "fs"
import UserSubmissions from '../Model/submissionschema.js';
import CodeDraft from '../Model/CodeDraftSchema.js';
import User from "../Model/User.js";
export const getAllProblems = async (req, res) => {
  const {page=1,limit=10 ,search="",difficulty=""} = req.query;
  const  query=search?{ title: { $regex: search, $options: "i" } } : {};
  
  if(difficulty&&difficulty!="All")query.difficulty=difficulty;

  const skip = (page - 1) * limit;

  try {
    const total = await Problem.countDocuments(query);
    const problems = await Problem.find(query)
      .skip(skip)
      .limit(limit)
      
      const totalPages = Math.ceil(total / limit);
      res.status(200).json({
        total:total,
        totalpages:totalPages,
       page: page,
        problems:problems
      });
  
  } catch (error) {
    res.status(500).json({ msg: "Error fetching problems", error: error.message });
  }
}

export const getProblemById = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await Problem.findById(id);
    if (!problem) {
      
      return res.status(404).json({ msg: "Problem not found" });
    }
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching problem", error: error.message });
  }
}

export const addProblem = async (req, res) => {
  console.log("Received request to add problem");
  const { title, description, difficulty,tags, sampleInput,sampleOutput, inputFormat,outputFormat,constraints } = req.body;
  let testCases=[];

  if(req.file){
    try{
      const filedata=fs.readFileSync(req.file.path,"utf-8")
      testCases=JSON.parse(filedata)
    }
    catch(err){
      console.log('Error parsing test cases file:', err);
      return res.status(400).json({msg:"invalid testcases file"});
    }
  }
  else if(req.body.testCases){
    try{
      testCases=JSON.parse(req.body.testCases);
    }
    catch(err){
      console.log('Error parsing test cases from body:', err);
      return res.status(400).json({msg:"Invalid testcases json string "});
    }
  }
  else{
    console.log("No testcases provided");
    return res.status(400).json({msg:"Missing Testcases"});
  }

  try {
    const newProblem = new Problem({ 
      title, 
      description, 
      difficulty,
      tags:tags.split(",").map(t=>t.trim()), 
      sampleInput,sampleOutput, inputFormat,outputFormat,constraints,testCases });

    await newProblem.save();
    res.status(201).json({msg:"problem created successfully",problem:newProblem});
  } catch (error) {
    if(error.name === "ValidationError"){
      console.log("Validation error:", error);
       const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ msg: "Validation error", errors });
    }
       if (error.code === 11000) {
        console.log("Duplicate title error:", error);
      return res.status(400).json({ msg: "Title already exists" });
    }
    console.log("Error adding problem:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
}



export const updateproblem=async(req, res) => {
    const { id } = req.params;
    const { title, description, difficulty,tags, sampleInput,sampleOutput, inputFormat,outputFormat,constraints,testCases } = req.body;
   
    if (!title || !description || !difficulty||!tags||!sampleInput||!sampleOutput||!inputFormat||!outputFormat||!constraints||!testCases) {
      
      return res.status(400).json({ msg: "Please provide all required fields" });
    }
    try {
        const updatedProblem = await Problem.findByIdAndUpdate(id, { title, description, difficulty,tags, sampleInput,sampleOutput, inputFormat,outputFormat,constraints,testCases }, { new: true });
        if (!updatedProblem) {
        return res.status(404).json({ msg: "Problem not found" });
        }
        
        res.status(200).json(updatedProblem);
    } catch (error) {
        res.status(500).json({ msg: "Error updating problem", error: error.message });
    }   
}

export const deleteproblem=async(req,res)=>{
    const {id}=req.params;
  
    try {
        const deletedProblem = await Problem.findByIdAndDelete(id);
        if (!deletedProblem) {
            return res.status(404).json({ msg: "Problem not found" });
        }
const submissionDeleteResult = await UserSubmissions.deleteMany({ problemId: id });
const draftDeleteResult = await CodeDraft.deleteMany({ problemId: id });
        return res.status(200).json({ msg: "Problem deleted successfully", 
            deletedProblem,
      submissionsDeleted: submissionDeleteResult.deletedCount,
      draftsDeleted: draftDeleteResult.deletedCount,
        });
    } catch (error) {
     
       return  res.status(500).json({ msg: "Error deleting problem", error: error.message });
    }   
}


export const recentproblems=async(req,res)=>{
  try{
    const problems=await Problem.find().sort({createdAt:-1}).limit(10);
    res.status(200).json(problems);
  }
  catch(err){
    res.status(500).json({msg:"Internal server error",error:err});
  }

}
export const totaluserandproblems=async(req,res)=>{{
  try{
    const totalProblems=await Problem.countDocuments(); 
    const totalUsers=await User.countDocuments();
    res.status(200).json({totalProblems,totalUsers});
  }
  catch(err){
    res.status(500).json({msg:"Internal server error",error:err});
  }
}}