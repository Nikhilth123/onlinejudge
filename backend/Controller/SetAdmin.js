import User from "../Model/User.js";

export const SetAdmin=(req,res)=>{
    const { email } = req.body;
console.log("Setting admin for email:", email);
    if (!email) {
        return res.status(400).json({ msg: "Email is required" });
    }

    User.findOneAndUpdate(
        { email: email },
        { role: "admin" },
        { new: true }
    )
    .then(user => {
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ msg: "User role updated to admin", user });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err, msg: "Server error" });
    });

}
