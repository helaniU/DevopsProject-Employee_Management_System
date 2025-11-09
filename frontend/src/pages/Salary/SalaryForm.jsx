import { useState, useEffect } from "react";

export default function SalaryForm({ employees, record, onSubmit, onClose }) {
  const [formData, setFormData] = useState({ employeeId: "", salary: "" });

  useEffect(() => {
    if (record) setFormData(record);
  }, [record]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ employeeId: "", salary: "" });
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{record ? "Edit Salary" : "Add Salary"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.department})
              </option>
            ))}
          </select>

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[#0e2f44] text-white transition"
            >
              {record ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
