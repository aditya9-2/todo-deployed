import noteModel from "../models/note.model.js";

const getAllNotes = async (req, res) => {

    const { userId } = req.user;

    try {
        const allNotes = await noteModel.find({ userId }).sort({ isPinned: -1 })

        return res.status(200).json({
            error: false,
            allNotes,
            message: "all notes retrieved successfully"
        });

    } catch (error) {

        return res.status(500).json({
            error: true,
            message: "Internval server error while retrieving all notes"
        })

    }

}

export default getAllNotes;