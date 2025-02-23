import { validateLoginUSer } from '../validators/validateCreateUser.js';
import userModel from '../models/user.model.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const loginUser = async (req, res) => {

    const validationResult = validateLoginUSer(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            error: true,
            message: "Validation failed",
            details: validationResult.message,
        })
    }

    const { email, password } = req.body;


    try {

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                error: true,
                message: "User not found"
            })
        }

        const isMatchedPassword = await bcrypt.compare(password, user.password);

        if (!isMatchedPassword) {
            return res.status(400).json({
                error: true,
                message: "Wrong Password"
            })
        }

        const accessToken = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET);


        return res.status(200).json({
            error: false,
            message: "Login Successful",
            email,
            accessToken
        })

    } catch (err) {

        return res.status(500).json({
            error: true,
            message: 'Server error',
            details: err.message,
        });

    }

}