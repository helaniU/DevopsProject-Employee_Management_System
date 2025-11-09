import { useState } from "react";
import Navbar from "../../components/AdminNavbar";

export default function Leave() {
  const [leaves, setLeaves] = useState([
    { id: 1, employee: "John Doe", type: "Sick Leave", from: "2025-09-01", to: "2025-09-03" },
    { id: 2, employee: "Jane Smith", type: "Casual Leave", from: "2025-09-05", to: "2025-09-06" },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLeave, setEditingLeave] = useState(null);

  // 🔹 modal state
  const [modal, setModal] = useState({ open: false, id: null, action: "" });

  const handleFormSubmit = (leaveData) => {
    if (editingLeave) {
      setLeaves(leaves.map((l) => (l.id === editingLeave.id ? leaveData : l)));
    } else {
      const newLeave = { ...leaveData, id: Date.now() };
      setLeaves([...leaves, newLeave]);
    }
    setIsFormOpen(false);
    setEditingLeave(null);
  };

  // 🔹 open confirmation modal
  const openModal = (id, action) => {
    setModal({ open: true, id, action });
  };

  // 🔹 handle approve/reject
  const confirmAction = () => {
    const { id, action } = modal;
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === id
          ? { ...leave, status: action === "approve" ? "Approved" : "Rejected" }
          : leave
      )
    );
    setModal({ open: false, id: null, action: "" });
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
              <tr key={l.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{l.employee}</td>
                <td className="p-3">{l.type}</td>
                <td className="p-3">{l.from}</td>
                <td className="p-3">{l.to}</td>
                <td className="p-3 space-x-2">
                  {/* <-- CHANGED: show Approve/Reject only when status is not set (Pending). 
                              After confirm, show Approved (green) or Rejected (red) button. */}
                  {(!l.status || l.status === "Pending") ? (
                    <>
                      <button
                        className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                        onClick={() => openModal(l.id, "approve")}
                      >
                        Approve
                      </button>

                      <button
                        className="bg-yellow-800 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        onClick={() => openModal(l.id, "reject")}
                      >
                        Reject
                      </button>
                    </>
                  ) : l.status === "Approved" ? (
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded cursor-default"
                      disabled
                    >
                      Approved
                    </button>
                  ) : (
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded cursor-default"
                      disabled
                    >
                      Rejected
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
              {modal.action === "approve"
                ? "Approve this leave?"
                : "Reject this leave?"}
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to{" "}
              <span
                className={
                  modal.action === "approve"
                    ? "text-green-600 font-medium"
                    : "text-red-600 font-medium"
                }
              >
                {modal.action === "approve" ? "approve" : "reject"}
              </span>{" "}
              this leave?
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={confirmAction}
                className={`px-4 py-2 rounded text-white ${
                  modal.action === "approve"
                    ? "bg-green-600 hover:bg-green-500"
                    : "bg-red-600 hover:bg-red-500"
                }`}
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
