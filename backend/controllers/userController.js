import { validateCreateUser } from '../validators/validateCreateUser.js';
import userModel from '../models/user.model.js';
import bcrypt from "bcryptjs";

export const createAccount = async (req, res) => {

    const validationResult = validateCreateUser(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            error: true,
            message: "Validation failed",
            details: validationResult.errors,
        });
    }

    const { fullName, email, password } = req.body;

    try {

        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);

        const isUser = await userModel.findOne({
            email
        });

        if (isUser) {
            return res.status(400).json({
                error: true,
                message: "User already exists",
            });
        }

        const user = new userModel({
            fullName,
            email,
            password: hashedPassword
        });

        await user.save();


        return res.json({

            error: false,
            user: user.fullName,
            message: "Registration Successful"

        });



    } catch (err) {

        return res.status(500).json({
            error: true,
            message: "Failed to create user",
            details: err.message,
        })

    }
};
