import noteModel from "../models/note.model.js";

const isPinned = async (req, res) => {
    const noteId = req.params.noteId;

    const { userId } = req.user;


    const { isPinned } = req.body;

    try {

        const note = await noteModel.findOne({ _id: noteId, userId });


        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found",
            });
        }

        note.isPinned = isPinned;

        await note.save();

        return res.status(200).json({
            error: false,
            message: "Note updated successfully",
            isPinned: note.isPinned,
            note
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: "Internal server error while editing notes",
            details: err.message,
        });
    }
};

export default isPinned;
