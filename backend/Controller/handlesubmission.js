    import fetch from 'node-fetch';
    import Problem from '../Model/Problemschema.js';
    import UserSubmissions from '../Model/submissionschema.js'
    import dotenv from 'dotenv';
    dotenv.config();

    const handlesubmission = async (req, res) => {
        try {
            const {  problemId }=req.params;
            const {id} = req.user;
            const userId = id; 
            const {code, language } = req.body;
          
           

            if (!problemId || !userId || !code || !language) {
                return res.status(400).json({ msg: "All fields are required" });
            }
            const data = await Problem.findById(problemId);
            if (!data) {
                return res.status(404).json({ msg: "Problem not found" });
            }
            const testCases = data.testCases;
           
            const response = await fetch(`${process.env.COMPILER_URL}/api/submit`, {
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
            if (!response.ok) {
                const errorData = await response.json();
                
                return res.status(res.status).json({ msg: errorData.msg || "Submission failed" });
            }
            const result = await response.json();
           
            const newsubmission = new UserSubmissions({
                userId: userId,
                createdAt: Date.now(),
                problemId: problemId,
                code: code,
                language: language,
                status: result.verdict || result.errorType,
                expectedoutput:result.expectedoutput,
                output:result.output,
                error: result.error || '',
                executionTime: result.time
            })
               
           await newsubmission.save();
                
            return res.status(200).json(result);
        } catch (error) {
           
            res.status(500).json({ msg: "Internal server error",err });
        }
    }
    export default handlesubmission;