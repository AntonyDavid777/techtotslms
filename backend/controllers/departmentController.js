const Department = require("../models/Department");

// ======================================
// Create Department
// ======================================
const createDepartment = async (req, res) => {
    try {

        const { name, code, hod, description } = req.body;

        // Check required fields
        if (!name || !code) {
            return res.status(400).json({
                success: false,
                message: "Name and Code are required"
            });
        }

        // Check duplicate department
        const existingDepartment = await Department.findOne({
            $or: [{ name }, { code }]
        });

        if (existingDepartment) {
            return res.status(400).json({
                success: false,
                message: "Department already exists"
            });
        }

        const department = await Department.create({
            name,
            code,
            hod,
            description
        });

        res.status(201).json({
            success: true,
            message: "Department Created Successfully",
            department
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// Get All Departments
// ======================================
const getDepartments = async (req, res) => {
    try {

        const departments = await Department.find();

        res.status(200).json({
            success: true,
            count: departments.length,
            departments
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createDepartment,
    getDepartments
};