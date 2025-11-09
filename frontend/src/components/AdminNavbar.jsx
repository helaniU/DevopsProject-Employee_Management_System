import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ role, currentUser: propUser }) {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [userMenuOpen, setUserMenuOpen] = useState(false); // user box dropdown
  const navigate = useNavigate();

  // Prefer the `currentUser` passed as a prop (reactive) and fallback to localStorage
  const currentUser = propUser ?? JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const links = [
    { name: "Dashboard", path: "/dashboard/admins" },
    { name: "Profile", path: "/admin-profile" },
    { name: "Notices", path: "/noticelist" },
    { name: "Admins", path: "/adminlist" },
  ];
// Helper to mask email: first 2 letters + *** + rest of the email
const maskEmail = (email) => {
  if (!email || typeof email !== "string") return "";
  const parts = email.split("@");
  if (parts.length < 2) return email; // not a valid email
  const [user, domain] = parts;
  if (!user) return "****@" + domain;
  if (user.length <= 2) return user + "****@" + domain;
  return user.slice(0, 2) + "****@" + domain;
};


  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-[#0e2f44] shadow-md relative">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-3">
        <img
          src="/EMSlogo.png"
          className="w-10 h-10 object-contain bg-white rounded-xl"
          alt="EMS Logo"
        />
        <h1 className="text-2xl md:text-4xl font-bold text-white">EMS</h1>
      </div>

      {/* Desktop Links */}
      <nav className="hidden md:flex space-x-6 items-center text-white">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "font-semibold border-b-2 border-white pb-1"
                : "font-medium hover:text-[#cbbeb5] transition"
            }
          >
            {link.name}
          </NavLink>
        ))}

       {/* User box */}
        {currentUser && (
          <div className="relative ml-4">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center bg-[#325164] text-white px-3 py-1 rounded-2xl font-medium hover:bg-[#263d4c] transition"
            >
              {/* Profile icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 flex-shrink-0 border-2 rounded-4xl"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>

              {/* Two lines of text */}
              <div className="flex flex-col ml-1 justify-center leading-tight">
                <span className="text-[13px]">Signed in as</span>
                <span className="text-[13px] font-semibold">{maskEmail(currentUser?.email)}</span>
              </div>
            </button>

            {/* Dropdown */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-1 w-36  text-white rounded-lg shadow-lg py-2 px-2 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2 py-2 bg-red-500 hover:bg-red-600 hover:text-white font-semibold rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Mobile Links */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#0e2f44] text-white flex flex-col space-y-3 p-4 shadow-md md:hidden z-50">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold border-l-4 border-white pl-2"
                  : "font-medium hover:text-[#cbbeb5] transition pl-2"
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Mobile user box */}
          {currentUser && (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 bg-white/10 text-white px-3 py-1 rounded-full font-medium hover:bg-white/20 transition w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  Signed in as {maskEmail(currentUser?.email)}
                </span>
              </button>

              {userMenuOpen && (
                <div className="mt-2 w-full bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white font-semibold rounded-lg transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
