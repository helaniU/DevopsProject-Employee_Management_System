import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi"; // for eye icon

export default function Signup() {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    birthday: "",
    position: "",
    gender: "",
    married: "",
    image: "",
    role: "employee",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const signupData = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    department: formData.department,
    birthday: formData.birthday,
    position: formData.position,
    gender: formData.gender,
    married: formData.married,
    role: formData.role,
    image: formData.image ? formData.image.name : "",
    rememberMe: formData.rememberMe,
  };

  try {
    const res = await axios.post("http://localhost:5000/api/users/signup", signupData);
    alert(res.data.message);
    navigate("/login");
  } catch (err) {
    alert(err.response?.data?.message || "Signup failed");
  }
};


  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundImage: "url('/bgimage1.jpeg')" }}
    >
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-3 bg-[#0e2f44] shadow-md">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/EMSlogo.png"
              className="w-10 h-10 object-contain bg-white rounded-xl"
              alt="EMS Logo"
            />
            <h1 className="text-4xl font-bold text-white hover:underline">EMS</h1>
          </Link>
        </div>
        <div>
          <p className="text-white font-semibold">
            Contact us - 📞{" "}
            <a href="tel:+94771234567" className="hover:underline">
              +94 77 123 4567
            </a>
          </p>
        </div>
      </header>

      {/* Signup Form */}
      <div className="flex-grow flex items-center justify-center p-5 py-5">
        <div className="bg-white rounded-2xl shadow-2xl w-[800px] px-12 py-8">
          <h2 className="text-3xl font-bold text-[#0e2f44] mb-6 text-center">
            Create Your EMS Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#407294] focus:outline-none text-base"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#407294] focus:outline-none text-base"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#407294] focus:outline-none text-base pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#407294] focus:outline-none text-base"
              />
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#407294] focus:outline-none text-base"
              />
              <input
                type="text"
                name="position"
                placeholder="Position"
                value={formData.position}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#407294] focus:outline-none text-base"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#407294] focus:outline-none text-base"
              >
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
              <select
                name="married"
                value={formData.married}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#407294] focus:outline-none text-base"
              >
                <option value="">Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#407294] focus:outline-none text-base"
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>

              <div className="w-full">
                {/* <label className="block text-sm text-gray-600 mb-1">Upload your profile image</label> */}
                <div className="relative">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                    id="profile-image"
                  />
                 <div className="w-full">
                  <label
                    htmlFor="profile-image"
                    className="
                      w-full flex items-center gap-3
                      p-3 border-2 border-dashed border-gray-300 rounded-lg
                      bg-gray-50 hover:bg-gray-300 transition-colors
                      cursor-pointer text-gray-600 text-base
                      h-[52px]  // match your other input height
                      overflow-hidden
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="truncate">{formData.image ? formData.image.name : "Upload profile image"}</span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="profile-image"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-start gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#407294] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#407294]"></div>
                <span className="ml-3 text-sm text-gray-600">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0e2f44] hover:bg-[#407294] text-white font-bold p-2 rounded-lg transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-[#407294]">
            Already have an account?{" "}
            <Link to="/login" className="underline text-[#0e2f44]">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0e2f44] text-white py-2 mt-5">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <h2 className="text-lg font-semibold mb-2">About Employee Portal</h2>
            <p className="text-gray-300 leading-relaxed">
              Manage your personal details, track attendance, and stay connected with company updates—all in one secure place.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-1">Quick Links</h2>
            <ul className="space-y-1 text-gray-300">
              <li><a href="/profile" className="hover:text-white">My Profile</a></li>
              <li><a href="/notices" className="hover:text-white">Notices</a></li>
              <li><a href="/leaves" className="hover:text-white">Leave Requests</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Contact HR</h2>
            <p className="text-gray-300">📞 +94 77 123 4567</p>
            <p className="text-gray-300">📧 hr@company.com</p>
            <p className="text-gray-300">🏢 123, Colombo, Sri Lanka</p>
          </div>
        </div>

        <div className="mt-5 border-t border-gray-600 text-center text-gray-400 pt-2 pb-2 text-xs">
          © {new Date().getFullYear()} Employee Management System | All Rights Reserved
        </div>
      </footer>
    </div>
  );
}
