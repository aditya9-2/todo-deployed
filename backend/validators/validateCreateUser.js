import { z } from "zod";

export const createUserSchema = z.object({
    fullName: z.string().min(1, "Fullname is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long")
});

export const loginUserSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})

export const validateCreateUser = (data) => {
    try {
        createUserSchema.parse(data);
        return {
            success: true
        }
    } catch (err) {
        return {
            success: false,
            message: err.message

        }
    }
}


export const validateLoginUSer = (data) => {

    try {
        loginUserSchema.parse(data);
        return {
            success: true
        }

    } catch (err) {
        return {
            success: false,
            message: err.message

        }
    }
}