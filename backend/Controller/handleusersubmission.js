import UserSubmissions from "../Model/submissionschema.js";
const handleusersubmission = async (req, res) => {
    try {
        const { problemId } = req.params;
        const { id } = req.body;
        if (!id || !problemId) {
            return res.status(400).json({ msg: "User ID and Problem ID are required" });
        }
        const submissions = await UserSubmissions.find({ id, problemId }).sort({ createdAt: -1 });
        if (!submissions || submissions.length === 0) {
            return res.status(404).json({ msg: "No submissions found for this user and problem" });
        }
        console.log("submissions", submissions);
        return res.status(200).json(submissions);

    }
    catch(err){
        console.log("Error fetching user submissions:", err);
        res.status(500).json({ msg: "Internal server error",error:err });

    }
}

export default handleusersubmission;