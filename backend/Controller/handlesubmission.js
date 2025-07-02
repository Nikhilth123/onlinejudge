import fetch from 'node-fetch';
import Problem from '../Model/Problemschema';
import UserSubmissions from '../Model/submission.js'

const handlesubmission= async (req, res) => {
    try {
        const { problemId, userId, code, language } = req.body;
        
        if (!problemId || !userId || !code || !language) {
        return res.status(400).json({ msg: "All fields are required" });
        }
        const data=await Problem.findById(problemId);
        if (!data) {
            return res.status(404).json({ msg: "Problem not found" });
        }
      const testCases=data.testCases;
      const response=await fetch(`http://localhost:8000/api/submit`, {
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
        if(!response.ok) {
            const errorData = await response.json();
            return res.status(res.status).json({ msg: errorData.msg || "Submission failed" });
        }
        const result = await response.json();
        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        const newsubmission=new UserSubmissions({
            userId:userId,
            createdAt:Date.now(),
            problemId:problemId,
            code:code,
            language:language,
            status:result.verdict||result.errorType,
            error:result.error||'',
            executionTime:result.executionTime
        })

        await newsubmission.save();
        return res.status(200).json(result);
    } catch (error) {
        console.error("Submission error:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
}