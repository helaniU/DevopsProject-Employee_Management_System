import React, { useState, useMemo } from "react";
import Navbar from "../../components/Navbar";

export default function Notices() {
  const sampleNotices = [
    {
      id: 1,
      title: "Office Closed for Maintenance",
      message:
        "Office will be closed on 10th Sept for maintenance. Remote work encouraged.",
      time: "2025-09-10T09:00:00Z",
      tag: "Info",
    },
    {
      id: 2,
      title: "Updated Leave Policy",
      message:
        "Please review the updated leave policy in the HR portal before Oct 1.",
      time: "2025-08-18T12:30:00Z",
      tag: "Policy",
    },
  ];

  const [notices, setNotices] = useState(sampleNotices);
  const [query, setQuery] = useState("");
  const [selectedNotice, setSelectedNotice] = useState(null); // for modal
  const [acknowledged, setAcknowledged] = useState([]); // store acknowledged notice IDs

  // Filter + sort notices
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const sorted = [...notices].sort(
      (a, b) => new Date(b.time) - new Date(a.time)
    );
    if (!q) return sorted;
    return sorted.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.message.toLowerCase().includes(q) ||
        (n.tag && n.tag.toLowerCase().includes(q))
    );
  }, [notices, query]);

  const formatDate = (iso) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  // 🟩 When View is clicked
  const handleView = (notice) => {
    setSelectedNotice(notice);
  };

  // 🟥 When Acknowledge is clicked
  const handleAcknowledge = (id) => {
    if (!acknowledged.includes(id)) {
      setAcknowledged([...acknowledged, id]);
    }
  };

  // 🟨 Close modal
  const closeModal = () => setSelectedNotice(null);

  return (
    <div className="min-h-screen bg-[#d9d9d9]">
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0e2f44]">
            🛎️ Company Notices
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Important updates and announcements for employees. Use the search to
            find notices quickly.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Search & summary */}
          <aside className="bg-white p-6 rounded-xl shadow-sm">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search notices
              </label>
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search title, message or tag..."
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e2f44]"
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Total notices</p>
                <p className="text-2xl font-semibold text-[#0e2f44]">
                  {notices.length}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Showing</p>
                <p className="text-lg font-medium">{filtered.length} result(s)</p>
              </div>
            </div>
          </aside>

          {/* Right: Notices */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-[#0e2f44] text-center">
               📢 All Notices
              </h2>
            </div>

            <div className="space-y-4">
              {filtered.length === 0 ? (
                <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
                  <svg
                    className="w-12 h-12 text-gray-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1M12 8h.01M21 12.5a8.38 8.38 0 01-.9 3.8A8.5 8.5 0 113 12.5 8.38 8.38 0 013.9 8.7"
                    />
                  </svg>
                  <p className="text-gray-500 text-lg font-medium">
                    No notices yet.
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Check back later or add a new notice from the admin panel.
                  </p>
                </div>
              ) : (
                filtered.map((notice) => (
                  <article
                    key={notice.id}
                    className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row md:justify-between md:items-start gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#0e2f44] text-white font-semibold">
                          {notice.title
                            .split(" ")
                            .slice(0, 2)
                            .map((w) => w[0])
                            .join("")}
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {notice.title}
                          </h3>
                          <p className="text-sm text-gray-500">{notice.tag}</p>
                        </div>
                      </div>

                      <p className="mt-4 text-gray-700">{notice.message}</p>
                      <p className="mt-3 text-xs text-gray-400">
                        Posted on: {formatDate(notice.time)}
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => handleView(notice)}
                        className="px-3 py-1 rounded-md bg-[#f59e0b] text-white hover:bg-[#d97706] transition"
                      >
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAcknowledge(notice.id)}
                        className={`px-3 py-1 rounded-md text-white transition ${
                          acknowledged.includes(notice.id)
                            ? "bg-green-600 cursor-not-allowed"
                            : "bg-[#ef4444] hover:bg-[#dc2626]"
                        }`}
                        disabled={acknowledged.includes(notice.id)}
                      >
                        {acknowledged.includes(notice.id)
                          ? "Acknowledged"
                          : "Acknowledge"}
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      {/* 🟦 Modal for "View" */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-[#0e2f44] bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 relative shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-[#0e2f44] mb-2">
              {selectedNotice.title}
            </h2>
            <p className="text-sm text-gray-500 mb-4">{selectedNotice.tag}</p>
            <p className="text-gray-700">{selectedNotice.message}</p>
            <p className="mt-4 text-xs text-gray-400">
              Posted on: {formatDate(selectedNotice.time)}
            </p>
          </div>
        </div>
      )}
      <footer className="bg-[#102b3d] text-white py-4 mt-10">
      <div className="max-w-6xl mx-auto text-center text-sm">
        <p className="font-semibold">Company Notices & Announcements</p>
        <p className="text-gray-200">
          Stay informed. All updates are verified by the HR Department.
        </p>
      </div>
    </footer>
    </div>
  );
}
