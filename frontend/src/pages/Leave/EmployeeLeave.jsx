import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function Leave() {
  const [leaves, setLeaves] = useState([
    { id: 1, from: "2025-09-01", to: "2025-09-02", reason: "Sick", status: "approved" },
    { id: 2, from: "2025-09-05", to: "2025-09-10", reason: "Vacation", status: "pending" },
    { id: 3, from: "2025-09-12", to: "2025-09-13", reason: "Family", status: "rejected" },
  ]);

  const [newLeave, setNewLeave] = useState({ from: "", to: "", reason: "" });

  const handleApply = () => {
    if (!newLeave.from || !newLeave.to || !newLeave.reason) return;
    setLeaves([
      ...leaves,
      { ...newLeave, id: Date.now(), status: "pending" },
    ]);
    setNewLeave({ from: "", to: "", reason: "" });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <Navbar />

      <div className="flex-1 px-6 py-10 max-w-4xl mx-auto w-full">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#0e2f44] mb-2">
            🗓️ Leave Management
          </h1>
          <p className="text-gray-600">
            Apply for new leaves and track your previous applications.
          </p>
        </div>

        {/* Apply New Leave Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-10 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-[#0e2f44] mb-6 border-b pb-3">
           🖊️ Apply New Leave
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                value={newLeave.from}
                onChange={(e) =>
                  setNewLeave({ ...newLeave, from: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0e2f44] focus:border-[#0e2f44] transition"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                value={newLeave.to}
                onChange={(e) =>
                  setNewLeave({ ...newLeave, to: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0e2f44] focus:border-[#0e2f44] transition"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">
                Reason
              </label>
              <input
                type="text"
                placeholder="e.g. Medical leave, personal reason..."
                value={newLeave.reason}
                onChange={(e) =>
                  setNewLeave({ ...newLeave, reason: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0e2f44] focus:border-[#0e2f44] transition"
              />
            </div>
          </div>

          <button
            onClick={handleApply}
            className="w-full sm:w-auto px-6 py-3 bg-[#0e2f44] text-white font-semibold rounded-lg hover:bg-[#2a5a85] transition"
          >
            Apply Leave
          </button>
        </div>

        {/* Leave Records Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-[#0e2f44] text-white text-lg font-semibold p-4 text-center">
            📋 My Leave Records
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-m font-bold text-[#4d4844]">
                  From
                </th>
                <th className="p-4 text-m font-bold text-[#4d4844]">
                  To
                </th>
                <th className="p-4 text-m font-bold text-[#4d4844]">
                  Reason
                </th>
                <th className="p-4 text-m font-bold text-[#4d4844] text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr
                  key={leave.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-gray-700">{leave.from}</td>
                  <td className="p-4 text-gray-700">{leave.to}</td>
                  <td className="p-4 text-gray-700">{leave.reason}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                        leave.status
                      )}`}
                    >
                      {leave.status.charAt(0).toUpperCase() +
                        leave.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-sm text-gray-500">
          © {new Date().getFullYear()} Employee Dashboard | All Rights Reserved
        </div>
      </div>
    </div>
  );
}
