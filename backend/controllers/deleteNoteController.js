import noteModel from "../models/note.model.js";

const deleteNote = async (req, res) => {

    const noteId = req.params.noteId;
    const { userId } = req.user;

    try {
        const note = await noteModel.findOne({ _id: noteId, userId });

        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found"
            });
        }

        await noteModel.deleteOne({ _id: noteId, userId });

        return res.status(200).json({
            erroe: false,
            message: "note deleted succefully"
        });

    } catch (err) {

        return res.status(500).json({
            error: true,
            message: "Internal server error while deleting notes",
            details: err.message,
        });

    }

}
export default deleteNote;