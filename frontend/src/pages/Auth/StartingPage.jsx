import { Link } from "react-router-dom";

export default function GetStarted() {
  return (
    <div className="min-h-screen flex flex-col bg-[#62798e]">
      
      <header className="w-full flex items-center justify-between px-6 py-3 bg-[#0e2f44] shadow-md">
        {/* Left side: Logo + Title */}
        <div className="flex items-center gap-3 ">
          <img
            src="/EMSlogo.png"
            className="w-10 h-10 object-contain bg-white rounded-xl"
            alt="EMS Logo"
          />
          <h1 className="text-4xl font-bold text-white">EMS</h1>
        </div>

        {/* Right side: Contact Number */}
        <div>
          <p className="text-white font-semibold">Contact us - 📞
            <a href="tel:+94771234567" className="text-white font-semibold hover:underline">
              +94 77 123 45679999999
            </a>
          </p>
        </div>
      </header>


      {/* Centered Content */}
      <div className="flex flex-grow items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl flex overflow-hidden w-[950px] h-[480px] mt-5">
          
          {/* Left side - Text & Buttons */}
          <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-[#dad0c9]">
            <h2 className="text-3xl font-bold text-[#0e2f44] mb-10 text-center">
              Employee Management System
            </h2>
            <p className="text-[#407294] mb-10 text-center font-bold">
              Manage employees efficiently with professional system
            </p>
            <div className="flex flex-col w-3/4 space-y-3">
              <Link to="/login">
                <button className="w-full bg-[#0e2f44] hover:bg-[#756d67] text-white py-2 rounded-xl font-semibold transition">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-full bg-[#407294] hover:bg-[#756d67] text-white py-2 rounded-xl font-semibold transition">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="w-1/2">
            <img
              src="/bgimage1.jpeg"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* Footer Section */}
  <footer className="bg-[#0e2f44] text-white py-5 mt-10">
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm">
      
      {/* --- About Section --- */}
      <div>
        <h2 className="text-lg font-semibold mb-2">About Employee Portal</h2>
        <p className="text-gray-300 leading-relaxed">
          The Employee Portal helps you manage your personal details, track attendance, 
          and view company updates — all in one secure place.
        </p>
      </div>

      {/* --- Quick Links --- */}
      <div>
        <h2 className="text-lg font-semibold mb-1">Quick Links</h2>
        <ul className="space-y-1 text-gray-300">
          <li><a href="/profile" className="hover:text-white">My Profile</a></li>
          <li><a href="/notices" className="hover:text-white">Notices</a></li>
          <li><a href="/leaves" className="hover:text-white">Leave Requests</a></li>
        </ul>
      </div>

      {/* --- Contact Info --- */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Contact HR</h2>
        <p className="text-gray-300">📞 +94 77 123 4567</p>
        <p className="text-gray-300">📧 hr@company.com</p>
        <p className="text-gray-300">🏢 123, Colombo, Sri Lanka</p>
      </div>
    </div>

    {/* --- Bottom Note --- */}
      <div className="mt-5 border-t border-gray-600 text-center text-gray-400 pt-4 text-xs">
        © {new Date().getFullYear()} Employee Management System | All Rights Reserved
      </div>
  </footer>
    </div>
  );
}
