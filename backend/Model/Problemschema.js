import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  Output: { type: String, required: true },
});

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  tags: [{ type: String }],
  inputFormat: { type: String },
  outputFormat: { type: String },
  sampleInputOutput:[testCaseSchema],
  constraints: { type: String },
  testCases: [testCaseSchema],
  createdBy: { type: String }, 
  createdAt: { type: Date, default: Date.now },
});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
