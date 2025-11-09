import { useState, useEffect } from "react";
import Navbar from "../../components/AdminNavbar";
import DepartmentForm from "./DepartmentForm";

export default function DepartmentList() {
  const [departments, setDepartments] = useState(() => {
    return JSON.parse(localStorage.getItem("departments")) || [
      { id: 1, name: "IT" },
      { id: 2, name: "HR" },
    ];
  });

  const [employees, setEmployees] = useState(() => {
    return JSON.parse(localStorage.getItem("employees")) || [];
  });

  const [editingDepartment, setEditingDepartment] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Update employees when the global employee list changes
  useEffect(() => {
    const handleEmployeesUpdated = () => {
      const updatedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
      setEmployees(updatedEmployees);
    };

    window.addEventListener("employeesUpdated", handleEmployeesUpdated);
    return () => window.removeEventListener("employeesUpdated", handleEmployeesUpdated);
  }, []);

  // Save departments to localStorage
  useEffect(() => {
    localStorage.setItem("departments", JSON.stringify(departments));
  }, [departments]);

  const handleEdit = (dept) => {
    setEditingDepartment(dept);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    setDepartments(departments.filter((d) => d.id !== id));
  };

  const handleFormSubmit = (data) => {
    if (editingDepartment) {
      setDepartments(departments.map((d) => (d.id === editingDepartment.id ? data : d)));
    } else {
      setDepartments([...departments, { ...data, id: Date.now() }]);
    }
    setIsFormOpen(false);
    setEditingDepartment(null);
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 bg-[#d9d9d9] min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#0e2f44]">🏢 Department Management</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-[#0e2f44] text-white px-4 py-2 rounded-lg hover:bg-[#144868] transition"
          >
            + Add Department
          </button>
        </div>

        {isFormOpen && (
          <DepartmentForm
            department={editingDepartment}
            onSubmit={handleFormSubmit}
            onClose={() => { setIsFormOpen(false); setEditingDepartment(null); }}
          />
        )}

        <table className="w-full bg-white rounded-xl shadow overflow-hidden">
          <thead className="bg-[#0e2f44] text-white">
            <tr>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Employee Names</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id} className="border-b">
                <td className="p-3">{dept.name}</td>

                {/* Details column */}
                <td className="p-3 flex flex-wrap gap-2">
                  {employees
                    .filter((emp) => emp.department === dept.name)
                    .map((emp) => (
                      <div key={emp.id} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
                        <img
                          src={emp.image || "https://via.placeholder.com/30"}
                          alt={emp.name}
                          className="w-6 h-6 rounded-full object-cover border-2 border-gray-300"
                        />
                        <span className="text-sm">{emp.name}</span>
                      </div>
                    ))}
                  {employees.filter((emp) => emp.department === dept.name).length === 0 && (
                    <span className="text-gray-400 text-sm">No employees</span>
                  )}
                </td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(dept)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dept.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="text-gray-600 py-5 text-center text-sm">
        © {new Date().getFullYear()} EMS Admin Panel — Department Overview
      </footer>

    </div>
  );
}
