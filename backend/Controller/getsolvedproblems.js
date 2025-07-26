import Problem from "../Model/Problemschema.js";
import UserSubmission from "../Model/submissionschema.js";

const getsolvedproblems = async (req, res) => {
    const {id}=req.user;
    console.log(id);
    try {
        const submissions = await UserSubmission.find({ userId: id, status: "Accepted" }).distinct("problemId");
        const solvedProblems = await Problem.find({ _id: { $in: submissions } })
        res.status(200).json({solvedProblems});
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error failed to fetch solved problems" });
    }

}

export default getsolvedproblems;