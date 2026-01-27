import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";
import leaveRequestRoutes from "./routes/leaveRequestRoutes.js";
import leaveRequestAdminRoutes from "./routes/leaveRequestAdmin.js";

// dotenv.config();
// connectDB();

dotenv.config(); // okay to keep, but environment will override .env

console.log("🔍 MONGO_URL:", process.env.MONGO_URL); // debug log

connectDB();

const app = express();
app.use(
  cors({
    origin: [
      "http://13.233.73.206:5333",
      "http://localhost:5173"
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/uploads", express.static("uploads"));

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Query:`, req.query);
  next();
});


// API Routes
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/admindashboard", adminDashboardRoutes);
app.use("/api/leaveRequests", leaveRequestRoutes);
app.use("/api/admin/leaveRequests", leaveRequestAdminRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!✅");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

