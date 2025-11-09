import { useState, useEffect, useRef } from "react";
import Navbar from "../components/AdminNavbar";

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: "Admin Name",
    email: "admin@example.com",
    department: "",
    birthday: "",
    position: "Administrator",
    gender: "",
    married: false,
    salary: "",
    image: "",
    phone: "",
    role: "admin"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const fileInputRef = useRef(null);

  // Load profile from localStorage or set defaults
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("currentUser"));
    if (userData) setProfile(userData);
    else localStorage.setItem("currentUser", JSON.stringify(profile));
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

  const handleSaveProfile = () => {
    localStorage.setItem("currentUser", JSON.stringify(profile));
    showMessageWithTimeout("Profile updated successfully! ✅", "success");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role={profile.role} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0e2f44] mb-8 text-center">🧑‍💼 Admin Profile</h1>

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
            {[
              { label: "Phone", name: "phone" },
              { label: "Department", name: "department" },
              { label: "Position", name: "position" },
              { label: "Birthday", name: "birthday" },
              { label: "Gender", name: "gender" },
              { label: "Role", name: "role" },
              { label: "Salary", name: "salary" },
              { label: "Married", name: "married", type: "checkbox" }
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
                  ) : field.name === "gender" || field.name === "role" ? (
                    <select
                      name={field.name}
                      value={profile[field.name]}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 border rounded-md"
                    >
                      {field.name === "gender" ? (
                        <>
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </>
                      ) : (
                        <>
                          <option value="admin">Admin</option>
                          <option value="superadmin">Super Admin</option>
                        </>
                      )}
                    </select>
                  ) : (
                    <input
                      type={field.name === "salary" ? "number" : "text"}
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
