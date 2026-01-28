import { useState, useEffect } from "react";
import Navbar from "../components/AdminNavbar";
import axios from "axios";
import { X, Send, MessageCircle } from "lucide-react";

export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = (admin) => {
    setSelectedAdmin(admin);
  };

  const sendMessage = async () => {
    try {
      await axios.post("http://13.233.73.206:5000/api/messages", {
        to: selectedAdmin._id,
        message: messageText,
      });
      alert("Message sent ✅");
      setSelectedAdmin(null);
      setMessageText("");
    } catch (err) {
      console.error(err);
      alert("Failed to send message ❌");
    }
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await axios.get(
          "http://13.233.73.206:5000/api/users/admins"
        );
        setAdmins(res.data);
      } catch (err) {
        console.error("Error fetching admin list:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

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
                  <th className="p-4 text-center font-medium">Profile</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr
                    key={admin._id}
                    className="border-b hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="p-4 font-semibold text-gray-800">
                      {admin.name}
                    </td>
                    <td className="p-4 text-gray-700">{admin.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          admin.role === "admin"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {admin.role}
                      </span>
                    </td>
                    <td className="p-4 text-gray-700">
                      {admin.phone || "-"}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleSendMessage(admin)}
                        className="px-4 py-2 text-sm font-semibold bg-[#7b685c] text-white rounded-lg hover:bg-[#433d39] transition"
                      >
                        Send Message
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
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">EMS Admin Panel</span> — All Rights
        Reserved
      </footer>

      {selectedAdmin && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-96 p-6 relative">
          {/* Close button */}
          <button
            onClick={() => setSelectedAdmin(null)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle size={24} className="text-[#7b685c]" />
            <h2 className="text-xl font-semibold text-gray-800">
              Message to {selectedAdmin.name}
            </h2>
          </div>

          {/* Textarea */}
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b685c] focus:border-[#7b685c] mb-4 resize-none"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message here..."
            rows={5}
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setSelectedAdmin(null)}
              className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              <X size={16} /> Cancel
            </button>
            <button
              onClick={sendMessage}
              className="flex items-center gap-1 px-4 py-2 bg-[#7b685c] text-white rounded-lg hover:bg-[#433d39] transition"
            >
              <Send size={16} /> Send
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}
