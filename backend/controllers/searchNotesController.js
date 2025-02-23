import noteModel from "../models/note.model.js";


const searchNotes = async (req, res) => {
    const { userId } = req.user;
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({
            error: true,
            message: "Search query is required",
        });
    }

    try {

        const regex = new RegExp(query, "i");

        const matchingNotes = await noteModel.find({
            userId: userId,  // Use userId in the query to match the correct user
            $or: [
                { title: { $regex: regex } },
                { content: { $regex: regex } },
            ]
        });

        return res.status(200).json({
            error: false,
            notes: matchingNotes,
            message: "Notes matching the search query retrieved successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Internal server error",
        });
    }
};

export default searchNotes;
