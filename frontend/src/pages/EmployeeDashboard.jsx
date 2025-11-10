import Navbar from "../components/Navbar";
import {
  UserIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EmployeeDashboard() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const stats = [
    {
      name: "Profile",
      value: currentUser?.name || "Employee",
      icon: <UserIcon className="h-8 w-8 text-[#0e2f44]" />,
    },
    {
      name: "Salary Paid",
      value: "$50,000",
      icon: <CurrencyDollarIcon className="h-8 w-8 text-[#407294]" />,
    },
    {
      name: "Leaves Taken",
      value: 5,
      icon: <CalendarIcon className="h-8 w-8 text-[#a29890]" />,
    },
    {
      name: "Notifications",
      value: 3,
      icon: <BellIcon className="h-8 w-8 text-[#cbbeb5]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#d9d9d9]">
      <Navbar role="employee" />
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-[#0e2f44]">
          🧑‍💻 Employee Dashboard
        </h1>
        <p className="mb-6 text-[#407294] font-bold">
          Welcome, {currentUser?.name}
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4 hover:shadow-lg transition cursor-pointer border border-gray-100"
            >
              {/* Icon Circle */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f3f4f6]">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-[#0e2f44]">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={() => navigate("/profile")}
            className="bg-[#0e2f44] text-white rounded-xl p-6 text-center font-semibold hover:bg-[#144462] transition cursor-pointer shadow-md"
          >
            View Profile
          </div>
          <div
            onClick={() => navigate("/salary")}
            className="bg-[#407294] text-white rounded-xl p-6 text-center font-semibold hover:bg-[#345e7a] transition cursor-pointer shadow-md"
          >
            View Salary
          </div>
          <div
            onClick={() => navigate("/leave")}
            className="bg-[#645d58] text-white rounded-xl p-6 text-center font-semibold hover:bg-[#7a7571] transition cursor-pointer shadow-md"
          >
            Request Leave
          </div>
          <div
            onClick={() => navigate("/notices")}
            className="bg-[#c9af9c] text-[#0e2f44] rounded-xl p-6 text-center font-semibold hover:bg-[#bc9e89] hover:text-white transition cursor-pointer shadow-md"
          >
            View Notices
          </div>
        </div>
        {/* Footer Note */}
        <p className="mt-20 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EMS Employee Portal. Confidential & Secure.
        </p>
      </div>
    </div>
  );
}
