import { z } from "zod";

export const userNoteSchema = z.object({
    title: z.string().min(2, "Title is required"),
    content: z.string().min(2, "Content is required"),
});

export const validateUserNoteSchema = (data) => {

    try {
        userNoteSchema.parse(data)
        return {
            success: true
        }
    } catch (err) {
        return {
            success: false,
            message: err.errors.map((e) => e.message).join(", ")
        }
    }
}