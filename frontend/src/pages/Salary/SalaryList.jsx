import { useState, useEffect } from "react";
import Navbar from "../../components/AdminNavbar";

export default function SalaryList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  // 🔹 Fetch Employees (with salary fields inside)
  useEffect(() => {
    fetch("http://13.233.73.206:5000/api/employees")
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error("Error fetching employees:", err));
  }, []);

  // 🔹 Calculate totals
  const totalPayroll = employees.reduce(
    (sum, emp) =>
      sum +
      (emp.basicSalary || 0) +
      (emp.allowance || 0) -
      (emp.deduction || 0),
    0
  );

  const averageSalary =
    employees.length > 0
      ? Math.floor(totalPayroll / employees.length)
      : 0;

  // 🔹 Search filter
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          💰 Payroll Management
        </h1>

        {/* 🔹 Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Total Employees</p>
            <h2 className="text-2xl font-bold">
              {employees.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Total Payroll</p>
            <h2 className="text-2xl font-bold">
              ${totalPayroll}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Average Salary</p>
            <h2 className="text-2xl font-bold">
              ${averageSalary}
            </h2>
          </div>
        </div>

        {/* 🔹 Search */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg w-1/3"
          />
        </div>

        {/* 🔹 Payroll Table */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-4 text-left">Employee</th>
                <th className="p-4 text-left">Department</th>
                <th className="p-4 text-left">Basic</th>
                <th className="p-4 text-left">Allowance</th>
                <th className="p-4 text-left">Deduction</th>
                <th className="p-4 text-left">Net Salary</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((emp) => {
                const net =
                  (emp.basicSalary || 0) +
                  (emp.allowance || 0) -
                  (emp.deduction || 0);

                return (
                  <tr
                    key={emp._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4 font-medium">
                      {emp.name}
                    </td>
                    <td className="p-4">
                      {emp.department}
                    </td>
                    <td className="p-4">
                      ${emp.basicSalary || 0}
                    </td>
                    <td className="p-4">
                      ${emp.allowance || 0}
                    </td>
                    <td className="p-4 text-red-600">
                      -${emp.deduction || 0}
                    </td>
                    <td className="p-4 font-semibold text-green-600">
                      ${net}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="text-gray-600 py-5 text-center text-sm">
        © {new Date().getFullYear()} EMS Admin Panel — Payroll Dashboard
      </footer>
    </div>
  );
}