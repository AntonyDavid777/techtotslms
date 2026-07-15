const express = require("express");
const router = express.Router();

const {
    createDepartment,
    getDepartments
} = require("../controllers/departmentController");

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Create Department (Admin Only)
router.post("/", protect, authorizeRoles("admin"), createDepartment);

// Get All Departments
router.get("/", protect, authorizeRoles("admin"), getDepartments);

module.exports = router;