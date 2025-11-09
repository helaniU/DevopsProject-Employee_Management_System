import express from "express";
import Department from "../models/Department.js";
import Employee from "../models/Employee.js";

const router = express.Router();

// ✅ Get all departments with employees
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    const employees = await Employee.find();

    const data = departments.map((dept) => ({
      ...dept.toObject(),
      employees: employees.filter((e) => e.department === dept.name),
    }));

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add a new department
router.post("/", async (req, res) => {
  try {
    const newDept = new Department(req.body);
    const saved = await newDept.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Update a department
router.put("/:id", async (req, res) => {
  try {
    const updated = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Delete a department
router.delete("/:id", async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: "Department deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
