import Navbar from "../../components/Navbar";
import { BanknotesIcon, CalendarIcon } from "@heroicons/react/24/outline";

export default function Salary() {
  const salaries = [
    { id: 1, month: "August", amount: 50000 },
    { id: 2, month: "July", amount: 50000 },
  ];

  const totalSalary = salaries.reduce((acc, s) => acc + s.amount, 0);

  return (
    <div className="min-h-screen bg-[#d9d9d9]">
      <Navbar role="employee" />
      <div className="p-8 max-w-5xl mx-auto">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#0e2f44]">💵 Salary Records</h1>
          <div className="flex items-center gap-2 bg-[#0e2f44] text-white px-4 py-2 rounded-lg shadow-md">
            <BanknotesIcon className="h-6 w-6 text-[#cbbeb5]" />
            <span className="font-semibold">Total: ${totalSalary.toLocaleString()}</span>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-10 w-10 text-[#407294]" />
            <div>
              <p className="text-gray-500 text-sm">Latest Month</p>
              <h2 className="text-xl font-bold text-[#0e2f44]">
                {salaries[0]?.month || "N/A"}
              </h2>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">Amount Received</p>
            <p className="text-2xl font-bold text-[#407294]">
              ${salaries[0]?.amount?.toLocaleString() || 0}
            </p>
          </div>
        </div>

        {/* Salary Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#0e2f44] text-white">
              <tr>
                <th className="p-4 text-sm font-semibold uppercase tracking-wider">
                  Month
                </th>
                <th className="p-4 text-sm font-semibold uppercase tracking-wider">
                  Amount
                </th>
                <th className="p-4 text-sm font-semibold uppercase tracking-wider text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {salaries.map((sal, index) => (
                <tr
                  key={sal.id}
                  className={`transition hover:bg-[#f5f5f5] ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-4 text-[#0e2f44] font-medium">{sal.month}</td>
                  <td className="p-4 text-[#407294] font-semibold">
                    ${sal.amount.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                      Paid
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-sm text-gray-500 text-center">
          All salary details are confidential and provided for your reference only.
        </p>
      </div>
    </div>
  );
}
