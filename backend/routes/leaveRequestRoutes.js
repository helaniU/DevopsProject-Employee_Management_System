import express from "express";
import LeaveRequest from "../models/LeaveRequests.js";

const router = express.Router();

// Get all leave requests for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(leaveRequests);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Apply new leave request
router.post("/", async (req, res) => {
  try {
    const { userId, from, to, reason } = req.body;

    if (!userId || !from || !to || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    const newLeaveRequest = new LeaveRequest({
      userId,
      from: fromDate,
      to: toDate,
      reason
    });

    await newLeaveRequest.save();
    res.status(201).json(newLeaveRequest);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export default router;
