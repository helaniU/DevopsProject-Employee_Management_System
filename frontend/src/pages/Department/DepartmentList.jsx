import { useState, useEffect } from "react";
import Navbar from "../../components/AdminNavbar";
import DepartmentForm from "./DepartmentForm";
import axios from "axios";

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingDepartment, setEditingDepartment] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Fetch employees and departments together
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, deptRes] = await Promise.all([
          axios.get("http://localhost:5000/api/employees"),
          axios.get("http://localhost:5000/api/departments"),
        ]);
        setEmployees(empRes.data);
        setDepartments(deptRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to fetch employees or departments");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Save departments to localStorage
  useEffect(() => {
    localStorage.setItem("departments", JSON.stringify(departments));
  }, [departments]);

  // Edit department
  const handleEdit = (dept) => {
    setEditingDepartment(dept);
    setIsFormOpen(true);
    setError(null);
  };

  // Delete department
  const handleDelete = async (deptId) => {
    try {
      await axios.delete(`http://localhost:5000/api/departments/${deptId}`);
      setDepartments(departments.filter((d) => d._id !== deptId));
    } catch (err) {
      console.error("Failed to delete department:", err);
      setError("Failed to delete department");
    }
  };

  // Add or update department
  const handleFormSubmit = async (data) => {
    // Check for duplicate names (ignore current editing department)
    const duplicate = departments.find(
      (d) => d.name.toLowerCase() === data.name.toLowerCase() && (!editingDepartment || d._id !== editingDepartment._id)
    );
    if (duplicate) {
      setError(`Department "${data.name}" already exists.`);
      return;
    }

    try {
      if (editingDepartment) {
        // Edit
        const res = await axios.put(
          `http://localhost:5000/api/departments/${editingDepartment._id}`,
          data
        );
        setDepartments(
          departments.map((d) => (d._id === editingDepartment._id ? res.data : d))
        );
      } else {
        // Add
        const res = await axios.post("http://localhost:5000/api/departments", data);
        setDepartments([...departments, res.data]);
      }

      setIsFormOpen(false);
      setEditingDepartment(null);
      setError(null);
    } catch (err) {
      console.error("Failed to save department:", err);
      // If backend returns duplicate error
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to save department.");
      }
    }
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
            onClose={() => {
              setIsFormOpen(false);
              setEditingDepartment(null);
              setError(null);
            }}
            error={error} // pass current error to the form
          />
        )}
              
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <>
            {error && <p className="text-red-500 mb-3">{error}</p>}
            <table className="w-full bg-white rounded-xl shadow overflow-hidden">
              <thead className="bg-[#0e2f44] text-white">
                <tr>
                  <th className="p-3 text-left">Department</th>
                  <th className="p-3 text-left">Employees</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => {
                  const deptEmployees = employees.filter(
                    (emp) => emp.department === dept.name
                  );
                  return (
                    <tr key={dept._id} className="border-b">
                      <td className="p-3">{dept.name}</td>
                      <td className="p-3 flex flex-wrap gap-2">
                        {deptEmployees.length > 0 ? (
                          deptEmployees.map((emp) => (
                            <div
                              key={emp._id}
                              className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full"
                            >
                              <img
                                src={emp.image || "https://via.placeholder.com/30"}
                                alt={emp.name}
                                className="w-6 h-6 rounded-full object-cover border-2 border-gray-300"
                              />
                              <span className="text-sm">{emp.name}</span>
                            </div>
                          ))
                        ) : (
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
                          onClick={() => handleDelete(dept._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>

      <footer className="text-gray-600 py-5 text-center text-sm">
        © {new Date().getFullYear()} EMS Admin Panel — Department Overview
      </footer>
    </div>
  );
}
