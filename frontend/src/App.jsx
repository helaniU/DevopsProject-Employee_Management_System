import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeList from "./pages/Employee/EmployeeList";
import DepartmentList from "./pages/Department/DepartmentList";
import Profile from "./pages/Employee/Profile";
import EmployeeSalary from "./pages/Salary/EmployeeSalary";
import EmployeeLeave from "./pages/Leave/EmployeeLeave";
import EmployeeNotices from "./pages/Notices/EmployeeNotices";
import ProtectedRoute from "./components/ProtectedRoute";
import SalaryList from "./pages/Salary/SalaryList";
import AdminProfile from "./pages/AdminProfile";
import AdminList from "./pages/AdminList";
import StartingPage from "./pages/Auth/StartingPage";
import LeaveList from "./pages/Leave/LeaveList";
import NoticeList from "./pages/Notices/NoticeList";


function App() {
  return (
    <Router>
      <Routes>
  {/* Public */}
  <Route path="/" element={<StartingPage />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />

  {/* Admin */}
  <Route path="/dashboard/admins" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
  {/* <Route path="/admin-profile" element={<ProtectedRoute role="admin"><AdminProfile /></ProtectedRoute>} /> */}
  <Route
  path="/admin-profile/:id"
  element={
    <ProtectedRoute role="admin">
      <AdminProfile />
    </ProtectedRoute>
  }
/>
  <Route path="/employees" element={<ProtectedRoute role="admin"><EmployeeList /></ProtectedRoute>} />
  <Route path="/departments" element={<ProtectedRoute role="admin"><DepartmentList /></ProtectedRoute>} />
  <Route path="/salarylist" element={<ProtectedRoute role="admin"><SalaryList /></ProtectedRoute>} />
  <Route path="/leavelist" element={<ProtectedRoute role="admin"><LeaveList /></ProtectedRoute>} />
  <Route path="/noticelist" element={<ProtectedRoute role="admin"><NoticeList /></ProtectedRoute>} />
  <Route path="/adminlist" element={<ProtectedRoute role="admin"><AdminList /></ProtectedRoute>} />
  
  {/* Employee */}
  <Route path="/dashboard/employees" element={<ProtectedRoute role="employee"><EmployeeDashboard /></ProtectedRoute>} />
  <Route path="/profile" element={<ProtectedRoute role="employee"><Profile /></ProtectedRoute>} />
  <Route path="/salary" element={<ProtectedRoute role="employee"><EmployeeSalary /></ProtectedRoute>} />
  <Route path="/leave" element={<ProtectedRoute role="employee"><EmployeeLeave /></ProtectedRoute>} />
  <Route path="/notices" element={<ProtectedRoute role="employee"><EmployeeNotices /></ProtectedRoute>} />
</Routes>

    </Router>
  );
}

export default App;
