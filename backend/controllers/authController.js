const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// ======================
// Register User
// ======================
const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role,
            department,
            year,
            section,
            rollNumber
        } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role,
            department,
            year,
            section,
            rollNumber
        });

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            token: generateToken(user._id),
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// ======================
// Login User
// ======================
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid Email"
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token: generateToken(user._id),
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    registerUser,
    loginUser
};