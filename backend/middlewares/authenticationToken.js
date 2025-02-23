import jwt from "jsonwebtoken";

// Authentication
const authenticationToken = (req, res, next) => {
    const autheHeader = req.headers["authorization"];
    const token = autheHeader && autheHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            error: true, message: "Access denied. No token provided."

        });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({
            error: true, message: "Invalid token."
        });
    }
}

export default authenticationToken;
