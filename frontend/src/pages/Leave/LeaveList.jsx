import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/AdminNavbar";

export default function AdminLeaveRequests() {
  const [leaves, setLeaves] = useState([]);
  const [modal, setModal] = useState({ open: false, id: null, action: "" });

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/leaveRequests");
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 open confirmation modal
  const openModal = (id, action) => {
    setModal({ open: true, id, action });
  };

  // 🔹 approve/reject action
  const confirmAction = async () => {
    const { id, action } = modal;
    try {
      const res = await axios.put(`http://localhost:5000/api/admin/leaveRequests/${id}/status`, {
        status: action === "approve" ? "approved" : "rejected",
      });
      setLeaves((prev) =>
        prev.map((leave) => (leave._id === id ? res.data : leave))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setModal({ open: false, id: null, action: "" });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-600 text-white";
      case "rejected":
        return "bg-red-600 text-white";
      default:
        return "bg-yellow-600 text-white";
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 bg-[#d9d9d9] min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#0e2f44]">🗓️ Leave Management</h1>
        </div>

        <table className="w-full bg-white rounded-xl shadow overflow-hidden">
          <thead className="bg-[#0e2f44] text-white">
            <tr>
              <th className="p-3 text-left">Employee</th>
              <th className="p-3 text-left">Leave Type</th>
              <th className="p-3 text-left">From</th>
              <th className="p-3 text-left">To</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((l) => (
              <tr key={l._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{l.userId.name}</td>
                <td className="p-3">{l.reason}</td>
                <td className="p-3">{new Date(l.from).toLocaleDateString()}</td>
                <td className="p-3">{new Date(l.to).toLocaleDateString()}</td>
                <td className="p-3 space-x-2">
                  {!l.status || l.status === "pending" ? (
                    <>
                      <button
                        className="bg-yellow-600 px-3 py-1 rounded hover:bg-green-600 transition text-white"
                        onClick={() => openModal(l._id, "approve")}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-yellow-800 px-3 py-1 rounded hover:bg-red-600 transition text-white"
                        onClick={() => openModal(l._id, "reject")}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <button className={`${getStatusColor(l.status)} px-3 py-1 rounded cursor-default`} disabled>
                      {l.status.charAt(0).toUpperCase() + l.status.slice(1)}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Modal for confirm */}
      {modal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-semibold mb-4">
              {modal.action === "approve" ? "Approve this leave?" : "Reject this leave?"}
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to{" "}
              <span className={modal.action === "approve" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                {modal.action === "approve" ? "approve" : "reject"}
              </span>{" "}
              this leave?
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={confirmAction}
                className={`px-4 py-2 rounded text-white ${modal.action === "approve" ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500"}`}
              >
                Yes
              </button>
              <button
                onClick={() => setModal({ open: false, id: null, action: "" })}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="text-gray-600 py-5 text-center text-sm">
        © {new Date().getFullYear()} EMS Admin Panel — Leave Management
      </footer>
    </div>
  );
}
