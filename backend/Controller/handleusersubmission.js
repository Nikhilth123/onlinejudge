import UserSubmissions from "../Model/submissionschema.js";
const handleusersubmission = async (req, res) => {
    try {
        const { problemId } = req.params;
        const { id } = req.user;
        if (!id || !problemId) {
            return res.status(400).json({ msg: "User ID and Problem ID are required" });
        }
        
        const submissions = await UserSubmissions.find({ userId:id, problemId }).sort({ createdAt: -1 });
        
   
        return res.status(200).json(submissions);

    }
    catch(err){
      
        res.status(500).json({ msg: "Internal server error",error:err });

    }
}
export const handleusertotalsubmissions= async (req, res) => {
    try{
        const { id } = req.user;
        if (!id) {
            return res.status(400).json({ msg: "User ID is required" });
        }
        const totalSubmissions = await UserSubmissions.countDocuments({ userId: id });
        const totalacceptedSubmissions = await UserSubmissions.countDocuments({ userId: id, status: 'Accepted' });
        const recentsubmissions = await UserSubmissions.find({ userId: id }).sort({ createdAt: -1 }).populate('problemId', 'title').limit(10);

        return res.status(200).json({ totalSubmissions, totalacceptedSubmissions, recentsubmissions });
    }
    catch(err){
        res.status(500).json({ msg: "Internal server error", error: err }); 
    }
}

export default handleusersubmission;