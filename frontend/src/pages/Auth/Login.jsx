import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi"; // for eye icon
import axios from "axios";


export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "employee",
  });

    const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send login request to backend
      const res = await axios.post("http://13.233.73.206:5000/api/users/login", {
        email: formData.email,
        password: formData.password,
      });
        const userData = res.data.user; // ✅ adjust if your backend sends { user: {...} }
  if (!userData) throw new Error("Invalid login");

  // ✅ Validate selected role
  if (userData.role !== formData.role) {
    throw new Error(`Incorrect role selected. Your account is "${userData.role}"`);
  }

  // Example in your Login.jsx after successful login
  localStorage.setItem("user", JSON.stringify(res.data.user));

  // ✅ Save user data in localStorage
  localStorage.setItem("currentUser", JSON.stringify(userData));

  // ✅ Save user email for profile fetching
  localStorage.setItem("currentUserEmail", userData.email);
  
      // Navigate based on role
      if (userData.role === "admin") {
        navigate("/dashboard/admins");
      } else {
        navigate("/dashboard/employees");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Login failed - check your credentials"
      );
      console.error(error);
    } finally {
      setLoading(false);
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
            <a
              href="tel:+94771234567"
              className="text-white font-semibold hover:underline"
            >
              +94 77 123 4567
            </a>
          </p>
        </div>
      </header>

      {/* Login Card */}
      <div className="flex-grow flex items-center justify-center p-5 py-5">
        <div className="bg-white rounded-2xl shadow-2xl w-[400px] px-10 py-5">
          <h2 className="text-3xl font-bold text-[#0e2f44] mb-5 text-center">
            EMS Login
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-[#a29890] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#407294]"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-[#a29890] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#407294]"
                required
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </span>
            </div>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-[#a29890] rounded-lg bg-[#cbbeb5] focus:outline-none focus:ring-2 focus:ring-[#407294]"
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0e2f44] hover:bg-[#407294] text-white font-bold p-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-[#407294]">
            Don’t have an account?{" "}
            <Link to="/signup" className="underline text-[#0e2f44]">
              Sign Up
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
              The Employee Portal helps you manage your personal details, track attendance, 
              and view company updates — all in one secure place.
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
