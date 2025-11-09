import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    department: "",
    birthday: "",
    position: "",
    gender: "",
    married: false,
    salary: "",
    image: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (user && typeof user === "object") setProfile(user);
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfile((p) => ({ ...p, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => setProfile((p) => ({ ...p, image: "" }));

  const triggerFileInput = () => fileInputRef.current && fileInputRef.current.click();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSaveProfile = () => {
    if (!profile.name.trim() || !profile.email.trim()) {
      alert("Please provide name and email.");
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(profile));
    setShowMessage(true);
    setIsEditing(false);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const formatDate = (iso) =>
    iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "-";

  return (
    <div className="min-h-screen bg-[#d9d9d9] flex flex-col">
      <Navbar />

      <div className="p-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6 text-[#0e2f44] text-center">🧑‍💼 My Profile</h1>

        <div className="bg-white p-6 rounded-2xl shadow-lg relative">
          {showMessage && (
            <div className="absolute top-4 right-4 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg shadow">
               Profile updated successfully! ✅
            </div>
          )}

          {/* Display Card */}
          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="flex flex-col items-center md:items-start md:col-span-1">
                <div className="relative">
                  <img
                    src={profile.image || "https://via.placeholder.com/240x240.png?text=Profile"}
                    alt={`${profile.name || "User"}`}
                    className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-xl"
                    style={{ boxShadow: "0 10px 30px rgba(14,47,68,0.12)" }}
                  />
                  <div className="absolute -bottom-2 right-0">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-[#0e2f44] hover:bg-[#144462] text-white px-3 py-1 rounded-md text-sm shadow"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                <div className="mt-4 text-center md:text-left">
                  <h2 className="text-xl font-semibold text-[#0e2f44]">{profile.name || "Unnamed Employee"}</h2>
                  <p className="text-l text-gray-700">{profile.position || "Position not set"}</p>
                  <p className="text-l text-gray-700">{profile.department || "Department not set"}</p>
                </div>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoRow label="Email" value={profile.email || "Email not set"} mail />
                <InfoRow label="Phone" value={profile.phone || "Not provided"} />
                <InfoRow label="Birthday" value={formatDate(profile.birthday)} />
                <InfoRow label="Gender" value={profile.gender || "-"} />
                <InfoRow label="Marital Status" value={profile.married ? "Married" : "Single"} />
                <InfoRow label="Salary" value={profile.salary ? `$${Number(profile.salary).toLocaleString()}` : "N/A"} />
              </div>
            </div>
          ) : (
            // Edit Form
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 text-center md:text-left">
                  <img
                    src={profile.image || "https://via.placeholder.com/240x240.png?text=Profile"}
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg mx-auto md:mx-0"
                    style={{ boxShadow: "0 8px 24px rgba(14,47,68,0.12)" }}
                  />
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  <div className="mt-3 flex justify-center md:justify-start gap-3">
                    <button onClick={triggerFileInput} className="px-4 py-2 rounded-md bg-[#0e2f44] text-white hover:bg-[#144462]">
                      {profile.image ? "Change" : "Upload"}
                    </button>
                    {profile.image && (
                      <button onClick={removeImage} className="px-4 py-2 rounded-md bg-red-50 text-red-700 hover:bg-red-100">
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <LabelInput label="Name" name="name" value={profile.name} onChange={handleChange} />
                    <LabelInput label="Email" name="email" type="email" value={profile.email} onChange={handleChange} />
                    <LabelInput label="Department" name="department" value={profile.department} onChange={handleChange} />
                    <LabelInput label="Position" name="position" value={profile.position} onChange={handleChange} />
                    <LabelInput label="Birthday" name="birthday" type="date" value={profile.birthday} onChange={handleChange} />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select name="gender" value={profile.gender} onChange={handleChange} className="w-full p-2 border rounded-lg">
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <input id="married" type="checkbox" name="married" checked={profile.married} onChange={handleChange} />
                      <label htmlFor="married" className="text-sm font-medium text-gray-700">Married</label>
                    </div>
                    <LabelInput label="Salary" name="salary" type="number" value={profile.salary} onChange={handleChange} />
                    <LabelInput label="Phone" name="phone" value={profile.phone || ""} onChange={handleChange} />
                  </div>

                  <div className="mt-5 flex gap-3">
                    <button onClick={handleSaveProfile} className="px-5 py-3 bg-[#0e2f44] text-white rounded-md hover:bg-[#144462]">
                      Save
                    </button>
                    <button onClick={() => setIsEditing(false)} className="px-5 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Footer Section */}
      <footer className="mt-10 text-gray-600 py-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} EMS Employee Portal. Confidential & Secure.
        </p>
        <p className="text-xs mt-1 text-gray-600">
          Designed and managed by the EMS Development Team
        </p>
      </footer>
      </div>
    </div>
  );
}

/* small presentational helpers */
function InfoRow({ label, value, mail }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500">{label}</span>
      {mail ? (
        <a href={`mailto:${value}`} className="text-sm font-medium text-[#0e2f44] break-all">
          {value}
        </a>
      ) : (
        <span className="text-sm text-gray-700">{value}</span>
      )}
    </div>
  );
}

function LabelInput({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#0e2f44]"
      />

      
    </div>
    
  );
}