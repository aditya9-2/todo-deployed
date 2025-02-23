import noteModel from "../models/note.model.js"
import { validateUserNoteSchema } from "../validators/validateUserNotes.js";


const addNote = async (req, res) => {

    const validationAddNoteResult = validateUserNoteSchema(req.body);

    if (!validationAddNoteResult.success) {
        return res.status(400).json({
            error: true,
            message: "validation failed for creating notes",
            details: validationAddNoteResult.message
        });

    }

    const { title, content } = req.body;
    const { userId } = req.user;

    try {
        const note = new noteModel({
            title,
            content,

            userId
        });

        await note.save();

        return res.status(200).json({
            error: false,
            message: "Note added successfully",
            note,
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error while adding notes",
            details: error.message
        });
    }
}

export default addNote