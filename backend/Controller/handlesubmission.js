import fetch from 'node-fetch';
import Problem from '../Model/Problemschema';

const handlesubmission= async (req, res) => {
    try {
        const { problemId, userId, code, language } = req.body;
    
        // Validate input
        if (!problemId || !userId || !code || !language) {
        return res.status(400).json({ msg: "All fields are required" });
        }
        const data=await Problem.findById(problemId);
        if (!data) {
            return res.status(404).json({ msg: "Problem not found" });
        }
      const testCases=data.testCases;
      const res=await fetch(`http://localhost:8000/api/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code,
                language,
                testCases
            }),
        });
        if(!res.ok) {
            const errorData = await res.json();
            return res.status(res.status).json({ msg: errorData.msg || "Submission failed" });
        }
        const result = await res.json();
        
       


        res.status(200).json({ msg: "Submission successful", problemId, userId, language });
    } catch (error) {
        console.error("Submission error:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
}