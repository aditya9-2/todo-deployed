import userModel from "../models/user.model.js";

const getUser = async (req, res) => {

    const { userId } = req.user;


    try {

        const isUser = await userModel.findOne({ _id: userId });

        if (!isUser) {
            return res.status(401).json({
                error: true,
                message: "User not found"
            });
        }

        return res.status(200).json({
            user: {
                fullName: isUser.fullName,
                email: isUser.email,
                _id: isUser._id,
                createdOn: isUser.createdOn
            },
            message: "User data retrieved succesfully"
        });

    } catch (err) {

        return res.status(500).json({
            error: true,
            message: "Internal server error while retrieving user details",
            details: err.message,
        });

    }


}

export default getUser