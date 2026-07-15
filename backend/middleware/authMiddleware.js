const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get logged in user (exclude password)
            req.user = await User.findById(decoded.id).select("-password");

            next();

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized, Invalid Token"
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No Token, Authorization Denied"
        });
    }
};

module.exports = { protect };