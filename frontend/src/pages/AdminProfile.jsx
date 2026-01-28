import { useState, useEffect, useRef } from "react";
import Navbar from "../components/AdminNavbar";
import axios from "axios";

export default function AdminProfile() {
  const [profile, setProfile] = useState(null); // start empty
  const [isEditing, setIsEditing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  // Fetch profile from database
useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const currentUserEmail = localStorage.getItem("currentUserEmail"); // make sure this is set at login
      if (!currentUserEmail) {
        setError("No logged-in user found. Please log in again.");
        setLoading(false);
        return;
      }

      console.log('Fetching profile with email:', currentUserEmail);
      const res = await axios.get(`http://13.233.73.206:5000/api/users/me`, {
        params: {
          email: currentUserEmail
        }
      });
      console.log("Profile response:", res.data);

      if (!res.data) {
        setError("No profile data received from server.");
        setLoading(false);
        return;
      }

      setProfile(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Profile fetch error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch user profile from server. Please try again.");
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
    setProfile(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfile(prev => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const currentUserEmail = localStorage.getItem("currentUserEmail");
      if (!currentUserEmail) {
        showMessageWithTimeout("User not logged in", "error");
        return;
      }

      // Update profile in the database
      await axios.put(`http://13.233.73.206:5000/api/users/me`, {
        ...profile,
        email: currentUserEmail
      });

      showMessageWithTimeout("Profile updated successfully! ✅", "success");
      setIsEditing(false);
    } catch (err) {
      console.error('Update profile error:', err.response?.data || err.message);
      showMessageWithTimeout(err.response?.data?.message || "Failed to update profile", "error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!profile) return null; // safeguard

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role={profile.role} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0e2f44] mb-8 text-center">
          🧑‍💼 Admin Profile
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Profile Header */}
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
                    className="absolute bottom-0 right-0 bg-[#0e2f44] text-white p-2 rounded-full hover:bg-[#1a4565] transition"
                  >
                    <span className="text-xl">+</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </>
              )}
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-[#0e2f44]">{profile.name}</h2>
            <p className="text-gray-500">{profile.position}</p>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name and Email always read-only */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-lg text-gray-800">{profile.name}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-lg text-gray-800">{profile.email}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">Birthday</p>
              <p className="text-lg text-gray-800">
                {profile.birthday ? new Date(profile.birthday).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : "-"}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">Role</p>
              <p className="text-lg text-gray-800 capitalize">{profile.role}</p>
            </div>

            {/* Other editable fields */}
            {[
              { label: "Phone", name: "phone" },
              { label: "Department", name: "department" },
              { label: "Position", name: "position" },
              { label: "Gender", name: "gender" },
              { label: "Married", name: "married" }
            ].map((field) => (
              <div key={field.name}>
                <p className="text-sm font-medium text-gray-500">{field.label}</p>
                {isEditing ? (
                  field.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      name={field.name}
                      checked={profile[field.name]}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  ) : field.name === "gender" ? (
                    <select
                      name={field.name}
                      value={profile[field.name]}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 border rounded-md"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      name={field.name}
                      value={profile[field.name]}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 border rounded-md"
                    />
                  )
                ) : (
                  <p className="text-lg text-gray-800">
                    {field.type === "checkbox"
                      ? profile[field.name] ? "Yes" : "No"
                      : profile[field.name] || "-"}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2 bg-[#0e2f44] text-white rounded-md hover:bg-[#1a4565] transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-[#0e2f44] text-white rounded-md hover:bg-[#1a4565] transition"
              >
                Edit Profile
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
