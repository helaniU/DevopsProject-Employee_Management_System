import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import {
  UsersIcon,
  BuildingLibraryIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://13.233.73.206:5000/api/admindashboard/stats");
        const data = res.data;

        setStats([
          { name: "Employees", value: data.employees, icon: <UsersIcon className="h-8 w-8 text-[#0e2f44]" /> },
          { name: "Departments", value: data.departments, icon: <BuildingLibraryIcon className="h-8 w-8 text-[#407294]" /> },
          { name: "Salary Records", value: data.salaryRecords, icon: <CurrencyDollarIcon className="h-8 w-8 text-[#a29890]" /> },
          { name: "Leaves", value: data.leaves, icon: <CalendarIcon className="h-8 w-8 text-[#cbbeb5]" /> },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (stats.length === 0) {
    return (
      <div className="min-h-screen bg-[#d9d9d9] flex justify-center items-center text-[#0e2f44] text-xl font-semibold">
        Loading dashboard stats...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#d9d9d9]">
      <AdminNavbar />
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-[#0e2f44]">
          🧑‍💻 Admin Dashboard
        </h1>
        <p className="mb-6 text-[#407294] font-bold">
          Welcome, {currentUser?.name || "Admin"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4 hover:shadow-lg transition cursor-pointer border border-gray-100"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f3f4f6]">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-[#0e2f44]">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={() => navigate("/employees")}
            className="bg-[#0e2f44] text-white rounded-xl p-6 text-center font-semibold hover:bg-[#144462] transition cursor-pointer shadow-md"
          >
            Employee Management
          </div>
          <div
            onClick={() => navigate("/departments")}
            className="bg-[#407294] text-white rounded-xl p-6 text-center font-semibold hover:bg-[#345e7a] transition cursor-pointer shadow-md"
          >
            Department Management
          </div>
          <div
            onClick={() => navigate("/salarylist")}
            className="bg-[#645d58] text-white rounded-xl p-6 text-center font-semibold hover:bg-[#7a7571] transition cursor-pointer shadow-md"
          >
            Salary Management
          </div>
          <div
            onClick={() => navigate("/leavelist")}
            className="bg-[#c9af9c] text-[#0e2f44] rounded-xl p-6 text-center font-semibold hover:bg-[#bc9e89] hover:text-white transition cursor-pointer shadow-md"
          >
            Leave Management
          </div>
        </div>

        <p className="mt-20 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EMS Admin Panel. All rights reserved.
        </p>
      </div>
    </div>
  );
}
