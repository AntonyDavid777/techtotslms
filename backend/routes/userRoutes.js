const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    getUserById,
    updateUser
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Get all users (Admin only)
router.get("/", protect, authorizeRoles("admin"), getAllUsers);

// Get single user (Admin only)
router.get("/:id", protect, authorizeRoles("admin"), getUserById);

router.put("/:id", protect, authorizeRoles("admin"), updateUser);

module.exports = router;