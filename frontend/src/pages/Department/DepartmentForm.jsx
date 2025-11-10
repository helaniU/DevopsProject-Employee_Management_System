import { useState, useEffect } from "react";

export default function DepartmentForm({ department, onSubmit, onClose, error }) {
  const [name, setName] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (department && department.name) setName(department.name);
  }, [department]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return; // prevent empty submission
    const payload = { name: name.trim() };
    console.log("Submitting department:", payload); // debug
    onSubmit(payload); // send exactly what backend expects
    // Do NOT reset here if editing; let parent handle form close
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-[#0e2f44]">
          {department ? "Edit Department" : "Add Department"}
        </h2>
        
        {/* Display error message */}
        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Department Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[#0e2f44] text-white hover:bg-[#1b5e88] transition"
            >
              {department ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
