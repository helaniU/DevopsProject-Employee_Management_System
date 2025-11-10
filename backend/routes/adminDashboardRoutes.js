import express from "express";
import Department from "../models/Department.js";
import Employees from "../models/Employee.js";
// Salary is optional, set 0 if not ready
// Leaves is optional, set 0 if not ready

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const employees = await Employees.countDocuments();
    const departments = await Department.countDocuments();

    // Temporarily set salaryRecords to 0
    const salaryRecords = 0;
    const leaves = 0;

    res.json({ employees, departments, salaryRecords, leaves });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Server error fetching stats" });
  }
});

export default router;
