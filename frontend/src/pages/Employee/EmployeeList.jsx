import { useState, useEffect } from "react";
import Navbar from "../../components/AdminNavbar";
import EmployeeForm from "./EmployeeForm";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // ✅ Load employees from MongoDB
  useEffect(() => {
    fetch("http://13.233.73.206:5000/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  // ✅ Add or Update Employee (connected to backend)
  const handleFormSubmit = async (employeeData) => {
    try {
      if (editingEmployee) {
        // Update existing employee
        await fetch(`http://13.233.73.206:5000/api/employees/${editingEmployee._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeeData),
        });
      } else {
        // Add new employee
        await fetch("http://13.233.73.206:5000/api/employees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeeData),
        });
      }

      // Refresh list
      const updatedList = await fetch("http://13.233.73.206:5000/api/employees").then((res) => res.json());
      setEmployees(updatedList);
      setIsFormOpen(false);
      setEditingEmployee(null);
    } catch (err) {
      console.error("Error saving employee:", err);
    }
  };

  // ✅ Edit employee
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  // ✅ Delete employee (backend)
  const handleDelete = async (id) => {
    try {
      await fetch(`http://13.233.73.206:5000/api/employees/${id}`, {
        method: "DELETE",
      });
      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 bg-[#d9d9d9] min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#0e2f44]">🧑‍💼 Employee Management</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-[#0e2f44] text-white px-4 py-2 rounded-lg hover:bg-[#194f71] transition"
          >
            + Add Employee
          </button>
        </div>

        {isFormOpen && (
          <EmployeeForm
            employee={editingEmployee}
            onSubmit={handleFormSubmit}
            onClose={() => {
              setIsFormOpen(false);
              setEditingEmployee(null);
            }}
          />
        )}

        <table className="w-full bg-white rounded-xl shadow overflow-hidden">
          <thead className="bg-[#0e2f44] text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Salary</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="border-b">
                <td className="p-3 flex items-center space-x-2">
                  <img
                    src={emp.image || "https://via.placeholder.com/120"}
                    className="w-10 h-10 rounded-full object-cover mt-2"
                  />
                  <span>{emp.name}</span>
                </td>
                <td className="p-3">{emp.email}</td>
                <td className="p-3">{emp.department}</td>
                <td className="p-3">{emp.salary}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(emp)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setConfirmDelete(emp._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 border-black">
            <h2 className="text-lg font-bold text-[#0e2f44] mb-4 text-center">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this employee? <br />
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete(confirmDelete);
                  setConfirmDelete(null);
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <footer className="text-gray-600 py-5 text-center text-sm">
        © {new Date().getFullYear()} EMS Admin Panel — Employee Records
      </footer>
    </div>
  );
}
