const User = require("../../models/user");
const createToken = require("../../utils/create-token");
const sendErrorResponse = require("../../utils/send-error-response")

module.exports = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.login(username, password);
        const token = await createToken(user._id)
        const today = new Date();
        let isMember = false;
        if (
            user.membership !== "none" &&
            user.membershipExpiresAt > today
          ) {
            isMember = true;
          }
        return res.status(200).json({ 
            code : 200,
            status: true,
            message: "User successfully logged in.",
            result: {
                user: await User.findOne({_id: user._id}).select("-password"),
                isMember: isMember,
                token: token,
            }
        }) 
        
    } catch (error) {
        sendErrorResponse(res,400,"Failed to login with your credentials." , error.message)
    }
}