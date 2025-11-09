import { useState, useEffect } from "react";

export default function DepartmentForm({ department, onSubmit, onClose }) {
  const [name, setName] = useState("");

  useEffect(() => { if (department) setName(department.name); }, [department]);

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Submitting department:", { name });
  onSubmit({ name });
  setName("");
};

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-[#0e2f44]">{department ? "Edit Department" : "Add Department"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Department Name" value={name} onChange={(e)=>setName(e.target.value)} className="w-full p-3 border rounded-lg" required />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-[#0e2f44] text-white hover:bg-[#1b5e88] transition">{department ? "Update" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
