import express from "express";
import LeaveRequest from "../models/LeaveRequests.js";

const router = express.Router();

// Get all leave requests (for admin)
router.get("/", async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find().sort({ createdAt: -1 }).populate("userId", "name email");
    res.json(leaveRequests);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Update leave status (approve/reject)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const leaveRequest = await LeaveRequest.findById(req.params.id);
    if (!leaveRequest) return res.status(404).json({ message: "Leave request not found" });

    leaveRequest.status = status;
    await leaveRequest.save();
    res.json(leaveRequest);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export default router;
