import noteModel from "../models/note.model.js";
import { validateEditNotes } from "../validators/validateEditNotes.js";

const editNote = async (req, res) => {
    const noteId = req.params.noteId;
    const validateEditNoteResult = validateEditNotes(req.body);
    const { userId } = req.user;

    if (!validateEditNoteResult.success) {
        return res.status(400).json({
            error: true,
            message: "Validation failed for editing notes",
            details: validateEditNoteResult.message,
        });
    }

    const { title, content, isPinned } = req.body;

    try {

        const note = await noteModel.findOne({ _id: noteId, userId });


        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found",
            });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (typeof isPinned !== 'undefined') note.isPinned = isPinned;


        await note.save();

        return res.status(200).json({
            error: false,
            message: "Note updated successfully",
            note,
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: "Internal server error while editing notes",
            details: err.message,
        });
    }
};

export default editNote;
