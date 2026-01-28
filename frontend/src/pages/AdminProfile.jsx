import { useState, useEffect, useRef } from "react";
import Navbar from "../components/AdminNavbar";
import axios from "axios";

import {
  User,
  Mail,
  Cake,
  Shield,
  Phone,
  Building2,
  Briefcase,
  Heart,
  Pencil,
} from "lucide-react";

export default function AdminProfile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUserEmail = localStorage.getItem("currentUserEmail");
        if (!currentUserEmail) {
          setError("No logged-in user found. Please log in again.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          "http://13.233.73.206:5000/api/users/me",
          { params: { email: currentUserEmail } }
        );

        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user profile.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const showMessageWithTimeout = (msg, type = "success", timeout = 3000) => {
    setMessage(msg);
    setMessageType(type);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), timeout);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setProfile((prev) => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const currentUserEmail = localStorage.getItem("currentUserEmail");
      await axios.put("http://13.233.73.206:5000/api/users/me", {
        ...profile,
        email: currentUserEmail,
      });

      showMessageWithTimeout("Profile updated successfully! ✅");
      setIsEditing(false);
    } catch {
      showMessageWithTimeout("Failed to update profile", "error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role={profile.role} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0e2f44] mb-8 text-center">
          🧑‍💼 Admin Profile
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={profile.image || "https://via.placeholder.com/150"}
                className="w-32 h-32 rounded-full object-cover border-4 border-[#0e2f44]"
              />
              {isEditing && (
                <>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-[#0e2f44] text-white p-2 rounded-full"
                  >
                    <Pencil size={18} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </>
              )}
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-[#0e2f44]">
              {profile.name}
            </h2>
            <p className="text-gray-500">{profile.position}</p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <User size={16} /> Name
              </p>
              <p className="text-lg">{profile.name}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Mail size={16} /> Email
              </p>
              <p className="text-lg">{profile.email}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Cake size={16} /> Birthday
              </p>
              <p className="text-lg">
                {profile.birthday
                  ? new Date(profile.birthday).toLocaleDateString()
                  : "-"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Shield size={16} /> Role
              </p>
              <p className="text-lg capitalize">{profile.role}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Phone size={16} /> Phone
              </p>
              {isEditing ? (
                <input
                  name="phone"
                  value={profile.phone || ""}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border rounded-md"
                />
              ) : (
                <p className="text-lg">{profile.phone || "-"}</p>
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Building2 size={16} /> Department
              </p>
              {isEditing ? (
                <input
                  name="department"
                  value={profile.department || ""}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border rounded-md"
                />
              ) : (
                <p className="text-lg">{profile.department || "-"}</p>
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Briefcase size={16} /> Position
              </p>
              {isEditing ? (
                <input
                  name="position"
                  value={profile.position || ""}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border rounded-md"
                />
              ) : (
                <p className="text-lg">{profile.position || "-"}</p>
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Heart size={16} /> Married
              </p>
              <p className="text-lg">
                {profile.married ? "Yes" : "No"}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-center gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2 bg-[#0e2f44] text-white rounded-md flex items-center gap-2"
                >
                  <Shield size={18} /> Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-[#0e2f44] text-white rounded-md flex items-center gap-2"
              >
                <Pencil size={18} /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 border-t border-gray-300 pt-2 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} EMS Admin Portal — All rights reserved.</p>
        <p className="text-gray-400">Managed securely by the Employee Management System.</p>
      </footer>

      {/* Message Popup */}
      {showMessage && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg text-white transition-all duration-500 ${
            messageType === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message}
        </div>
      )}
      
    </div>
  );
}
