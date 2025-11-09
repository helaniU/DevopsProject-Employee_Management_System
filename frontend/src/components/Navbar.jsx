import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ role }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };
  
  const links = [
          { name: "Dashboard", path: "/dashboard/employees" },
          { name: "My Profile", path: "/profile" },
          { name: "My Salary", path: "/salary" },
          { name: "Leave Requests", path: "/leave" },
        ];

  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-[#0e2f44] shadow-md">
      {/* Left side: Logo + Title */}
      <div className="flex items-center gap-3">
        <img
          src="/EMSlogo.png"
          className="w-10 h-10 object-contain bg-white rounded-xl"
          alt="EMS Logo"
        />
        <h1 className="text-2xl md:text-4xl font-bold text-white">EMS</h1>
      </div>

      {/* Desktop Navigation */}
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
        <button
          onClick={handleLogout}
          className="ml-4 bg-red-500 px-3 py-1 rounded-md transition hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#0e2f44] text-white flex flex-col space-y-3 p-4 shadow-md md:hidden">
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
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="mt-2 bg-red-500 px-3 py-1 rounded-md transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
