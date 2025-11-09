import { useState } from "react";
import Navbar from "../../components/AdminNavbar";
import SalaryForm from "./SalaryForm";

export default function SalaryList() {
  // Import employees from EmployeeList or use a shared state later
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", department: "IT" },
    { id: 2, name: "Jane Smith", department: "HR" },
  ]);

  const [salaries, setSalaries] = useState([
    { id: 1, employeeId: 1, salary: 50000 },
    { id: 2, employeeId: 2, salary: 45000 },
  ]);

  const [editingSalary, setEditingSalary] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEdit = (record) => {
    setEditingSalary(record);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    setSalaries(salaries.filter((rec) => rec.id !== id));
  };

  const handleFormSubmit = (data) => {
    if (editingSalary) {
      // Update existing salary
      setSalaries(salaries.map((rec) => (rec.id === editingSalary.id ? data : rec)));
    } else {
      // Add new salary
      const newRecord = { ...data, id: Date.now() };
      setSalaries([...salaries, newRecord]);
    }
    setIsFormOpen(false);
    setEditingSalary(null);
  };

  const getEmployeeName = (id) => employees.find(emp => emp.id === id)?.name || "";
  const getEmployeeDept = (id) => employees.find(emp => emp.id === id)?.department || "";

  return (
    <div>
      <Navbar />
      <div className="p-8 bg-[#d9d9d9] min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#0e2f44]">💰 Salary Management</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-[#0e2f44] text-white px-4 py-2 rounded-lg hover:bg-[#144868] transition"
          >
            + Add Salary
          </button>
        </div>

        {isFormOpen && (
          <SalaryForm
            employees={employees}
            record={editingSalary}
            onSubmit={handleFormSubmit}
            onClose={() => { setIsFormOpen(false); setEditingSalary(null); }}
          />
        )}

        <table className="w-full bg-white rounded-xl shadow overflow-hidden">
          <thead className="bg-[#0e2f44] text-white">
            <tr>
              <th className="p-3 text-left">Employee Name</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Salary</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((rec) => (
              <tr key={rec.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{getEmployeeName(rec.employeeId)}</td>
                <td className="p-3">{getEmployeeDept(rec.employeeId)}</td>
                <td className="p-3">${rec.salary}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(rec)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(rec.id)}
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
      <footer className="text-gray-600 py-5 text-center text-sm">
        © {new Date().getFullYear()} EMS Admin Panel — Salary Management
      </footer>
    </div>
    
  );
}
