import Problem from "../Model/Problemschema.js";

export const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find({});
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching problems", error: error.message });
  }
}

export const getProblemById = async (req, res) => {
  const { id } = req.params.id;
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
  const { title, description, difficulty,tags, sampleInput, sampleOutput, inputFormat,outputFormat,constraints,testCases } = req.body;
  if (!title || !description || !difficulty||!tags||!sampleInput||!sampleOutput||!inputFormat||!outputFormat||!constraints||!testCases) {
    return res.status(400).json({ msg: "Please provide all required fields" });
  }
  try {
    const newProblem = new Problem({ title, description, difficulty,tags, sampleInput, sampleOutput, inputFormat,outputFormat,constraints,testCases });
    await newProblem.save();
    res.status(201).json(newProblem);
  } catch (error) {
    res.status(500).json({ msg: "Error adding problem", error: error.message });
  }
}
export const updateproblem=async(req, res) => {
    const { id } = req.params;
    const { title, description, difficulty,tags, sampleInput, sampleOutput, inputFormat,outputFormat,constraints,testCases } = req.body;
    if (!title || !description || !difficulty||!tags||!sampleInput||!sampleOutput||!inputFormat||!outputFormat||!constraints||!testCases) {
        return res.status(400).json({ msg: "Please provide all required fields" });
    }
    try {
        const updatedProblem = await Problem.findByIdAndUpdate(id, { title, description, difficulty,tags, sampleInput, sampleOutput, inputFormat,outputFormat,constraints,testCases }, { new: true });
        if (!updatedProblem) {
        return res.status(404).json({ msg: "Problem not found" });
        }
        res.status(200).json(updatedProblem);
    } catch (error) {
        res.status(500).json({ msg: "Error updating problem", error: error.message });
    }   
}

export const deleteproblem=async(req,res)=>{
    const id=req.params;
    try {
        const deletedProblem = await Problem.findByIdAndDelete(id);
        if (!deletedProblem) {
            return res.status(404).json({ msg: "Problem not found" });
        }
        res.status(200).json({ msg: "Problem deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting problem", error: error.message });
    }   
}


