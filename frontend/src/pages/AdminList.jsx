import { useState } from "react";
import Navbar from "../components/AdminNavbar";
import { Trash2 } from "lucide-react";

export default function AdminList() {
  const [admins, setAdmins] = useState([
    { id: 1, name: "John Admin", email: "john@ems.com", role: "Super Admin", mobile: "123-456-7890" },
    { id: 2, name: "Jane Admin", email: "jane@ems.com", role: "Admin", mobile: "987-654-3210" },
  ]);

  const handleViewProfile = (admin) => {
    alert(`Viewing profile of ${admin.name}`);
    // 🔹 Later you can replace this with navigation like:
    // navigate(`/admin/profile/${admin.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#d9d9d9]">
      {/* Navbar */}
      <Navbar role="admin" />

      {/* Content */}
      <main className="flex-grow p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h1 className="text-4xl font-bold text-[#0e2f44] mb-6 text-center">
            👑 Our Admin Panel
          </h1>
          <p className="text-gray-600 text-center mb-8">
            View and manage all registered administrators of the EMS platform.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead className="bg-[#0e2f44] text-white">
                <tr>
                  <th className="p-4 text-left font-medium">Name</th>
                  <th className="p-4 text-left font-medium">Email</th>
                  <th className="p-4 text-left font-medium">Role</th>
                  <th className="p-4 text-left font-medium">Phone</th>
                  <th className="p-4 text-center font-medium">profile</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr
                    key={admin.id}
                    className="border-b hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="p-4 font-semibold text-gray-800">{admin.name}</td>
                    <td className="p-4 text-gray-700">{admin.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          admin.role === "Super Admin"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {admin.role}
                      </span>
                    </td>
                    <td className="p-4 text-gray-700">{admin.mobile}</td>
                    <td className="p-4 text-center">
                    <button
                      onClick={() => handleViewProfile(admin)}
                      className="px-4 py-2 text-sm font-semibold bg-[#7b685c] text-white rounded-lg hover:bg-[#433d39] transition"
                    >
                      View Profile
                    </button>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0e2f44] text-white py-5 text-center text-sm mt-10 shadow-inner">
        © {new Date().getFullYear()} <span className="font-semibold">EMS Admin Panel</span> — All Rights Reserved
      </footer>
    </div>
  );
}
