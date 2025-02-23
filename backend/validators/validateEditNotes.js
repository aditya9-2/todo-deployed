import { z } from "zod";

export const editNoteSchema = z.object({
    title: z.string().min(1, "Title cannot be empty"),
    content: z.string().min(1, "Content cannot be empty"),
})

export const validateEditNotes = (data) => {

    try {
        editNoteSchema.parse(data)
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