import { useState, useEffect } from "react";
import Navbar from "../../components/AdminNavbar";
import axios from "axios";

export default function NoticePage() {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ title: "", message: "" });
  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState(null); // For success message
  const [confirmBox, setConfirmBox] = useState({ show: false, id: null }); // For custom confirm box


  // ✅ Load notices from backend
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notices");
      setNotices(res.data);
    } catch (error) {
      console.error("Failed to fetch notices", error);
    }
  };

  const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ Add or Update notice
    const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date().toLocaleString();

    try {
      if (editingId) {
        // 🟡 Update existing notice
        await axios.put(`http://localhost:5000/api/notices/${editingId}`, {
          ...form,
          time: currentTime,
        });

        // Update locally without refetch
        setNotices((prev) =>
          prev.map((n) =>
            n._id === editingId ? { ...n, ...form, time: currentTime } : n
          )
        );
      } else {
        // 🟢 Add new notice
        const res = await axios.post("http://localhost:5000/api/notices", {
          ...form,
          time: currentTime,
        });

        // Add new notice locally instead of re-fetching
        setNotices((prev) => [...prev, res.data]);
      }

      // Reset form
      setForm({ title: "", message: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Failed to save notice", error);
    }
  };


  const handleDelete = (id) => {
  // Show custom confirmation box
  setConfirmBox({ show: true, id });
  };

  const handleEdit = (notice) => {
    setForm({ title: notice.title, message: notice.message });
    setEditingId(notice._id);
  };
  const confirmDelete = async () => {
  try {
    // Delete from database
    await axios.delete(`http://localhost:5000/api/notices/${confirmBox.id}`);

    // Then remove from UI
    setNotices((prev) => prev.filter((n) => n._id !== confirmBox.id));

    // Show success message
    setMessage(" Notice deleted successfully!✅");
  } catch (error) {
    console.error(error);
    setMessage("Failed to delete notice from database.❌");
  } finally {
    setConfirmBox({ show: false, id: null });

    // Auto hide message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  }
};


const cancelDelete = () => {
  setConfirmBox({ show: false, id: null });
};


  return (
    <div>
      <Navbar />
        {/* ✅ Success Message Box */}
        {message && (
          <div className="fixed top-6 right-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md">
            {message}
          </div>
        )}

        {/* ⚠️ Custom Confirm Box */}
        {confirmBox.show && (
          <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 text-center w-80">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this notice?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-all"
                >
                  Delete
                </button>
                <button
                  onClick={cancelDelete}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      <div className="p-8 bg-[#d9d9d9] min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-[#0e2f44]">📢 Admin Notice Board</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Notice form */}
          <div className="bg-white p-6 rounded-lg shadow-md flex-1 max-w-xl">
            <h2 className="text-xl font-semibold mb-4 text-[#0e2f44]">
              {editingId ? "✏️ Update Notice" : "✏️ Create New Notice"}
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Notice title"
                className="w-full p-2 border rounded mb-3"
                required
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Notice details..."
                className="w-full p-2 border rounded mb-3"
                rows="4"
                required
              />
              <button
                type="submit"
                className="bg-[#0e2f44] text-white px-4 py-2 rounded hover:bg-[#195b84] transition"
              >
                {editingId ? "Update Notice" : "Add Notice"}
              </button>
            </form>
          </div>

          {/* Right side - Notice list */}
          <div className="flex-1 justify-center">
            <h2 className="text-xl font-semibold mb-4 text-[#0e2f44] text-center">📝 All Notices</h2>
            <div className="space-y-4">
              {notices.length === 0 ? (
                <p className="text-gray-500 text-center">No notices yet.</p>
              ) : (
                notices.map((notice) => (
                  <div key={notice._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{notice.title}</h3>
                      <p className="text-gray-600 mt-1">{notice.message}</p>
                      <p className="text-sm text-gray-400 mt-2">Posted on: {notice.time}</p>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => handleEdit(notice)}
                        className="bg-yellow-600 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-500 transition-all duration-200"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(notice._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-500 transition-all duration-200"
                      >
                        Delete
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <footer className="text-gray-600 py-5 text-center mt-15 text-sm">
          © {new Date().getFullYear()} EMS Admin Panel — Notice Board
        </footer>
      </div>
    </div>
  );
}
