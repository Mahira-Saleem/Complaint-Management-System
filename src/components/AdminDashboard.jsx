import { useState } from "react";
import { Search, Trash2, Eye, Inbox, Layers, Clock, Loader2, CheckCircle2 } from "lucide-react";

export default function AdminDashboard({ complaints, onStatusChange, onDelete, onViewDetails, theme }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const isDark = theme === "dark";

  const totalCount = complaints.length;
  const pendingCount = complaints.filter((c) => c.status === "Pending").length;
  const progressCount = complaints.filter((c) => c.status === "In Progress").length;
  const resolvedCount = complaints.filter((c) => c.status === "Resolved").length;

  const filteredComplaints = complaints.filter((item) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query) ||
      item.studentName.toLowerCase().includes(query);

    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteClick = (id) => {
    if (window.confirm(`Delete complaint ${id}? This action cannot be undone.`)) {
      onDelete(id);
    }
  };

  const getPriorityBadge = (priority) => {
    if (isDark) {
      const darkMap = {
        High: "text-rose-200 bg-[#82193a]/45 border-[#a8244d]/60",
        Medium: "text-amber-200 bg-amber-500/15 border-amber-400/30",
        Low: "text-[#cfc9c0] bg-[#2a2733] border-[#3d3948]",
      };
      return darkMap[priority] || "";
    }
    const lightMap = {
      High: "text-[#82193a] bg-[#fee3c5]/70 border-[#e7b887]",
      Medium: "text-amber-900 bg-amber-100/80 border-amber-300",
      Low: "text-[#5c5144] bg-[#efe7d8] border-[#d8cbb6]",
    };
    return lightMap[priority] || "";
  };

  const getStatusSelectStyle = (status) => {
    if (isDark) {
      const darkStatus = {
        Pending: "bg-amber-500/15 text-amber-200 border-amber-400/35",
        "In Progress": "bg-sky-500/15 text-sky-200 border-sky-400/35",
        Resolved: "bg-emerald-500/15 text-emerald-200 border-emerald-400/35",
      };
      return darkStatus[status] || "bg-[#25232c] text-[#ece8e1] border-[#383442]";
    }
    const lightStatus = {
      Pending: "bg-amber-100/80 text-amber-900 border-amber-300",
      "In Progress": "bg-sky-100/80 text-sky-900 border-sky-300",
      Resolved: "bg-emerald-100/80 text-emerald-900 border-emerald-300",
    };
    return lightStatus[status] || "bg-[#f3ecdf] text-[#2a2520] border-[#d8cbb6]";
  };

  const surfaceClass = isDark
    ? "bg-[#201e26] border-[#322f3c] shadow-lg shadow-black/20"
    : "bg-[#fbf8f2] border-[#e2d8c7] shadow-xs";

  const inputClass = isDark
    ? "bg-[#17161c] border-[#322f3c] text-[#ece8e1] placeholder:text-[#78726a] focus:border-[#fee3c5]/60"
    : "bg-[#f5efe4] border-[#d8cbb6] text-[#2a2520] placeholder:text-[#968775] focus:border-[#82193a] focus:bg-[#fdfbf7]";

  const summaryCards = [
    {
      label: "Total Tickets",
      value: totalCount,
      icon: Layers,
      badge: isDark ? "bg-[#82193a]/35 text-[#fee3c5]" : "bg-[#82193a]/12 text-[#82193a]",
    },
    {
      label: "Pending",
      value: pendingCount,
      icon: Clock,
      badge: isDark ? "bg-amber-500/15 text-amber-300" : "bg-amber-100 text-amber-800",
    },
    {
      label: "In Progress",
      value: progressCount,
      icon: Loader2,
      badge: isDark ? "bg-sky-500/15 text-sky-300" : "bg-sky-100 text-sky-800",
    },
    {
      label: "Resolved",
      value: resolvedCount,
      icon: CheckCircle2,
      badge: isDark ? "bg-emerald-500/15 text-emerald-300" : "bg-emerald-100 text-emerald-800",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span
            className={`inline-block text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-md mb-2 ${
              isDark ? "bg-[#82193a]/30 text-[#fee3c5]" : "bg-[#82193a]/10 text-[#82193a]"
            }`}
          >
            Operations Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Console</h1>
          <p className={`text-sm mt-1 ${isDark ? "text-[#a9a39b]" : "text-[#6b5f51]"}`}>
            Track campus facility tickets, filter by department, and update resolution states.
          </p>
        </div>

        <div
          className={`self-start sm:self-auto text-xs font-medium px-3.5 py-2 rounded-xl border ${
            isDark
              ? "bg-[#201e26] border-[#322f3c] text-[#cfc9c0]"
              : "bg-[#fbf8f2] border-[#e2d8c7] text-[#5c5144]"
          }`}
        >
          Displaying <strong className={isDark ? "text-[#fee3c5]" : "text-[#82193a]"}>{filteredComplaints.length}</strong> of{" "}
          <strong>{totalCount}</strong>
        </div>
      </div>

      {/* Compact Metric Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`rounded-2xl border p-4 flex items-center justify-between transition ${surfaceClass}`}
            >
              <div>
                <p className={`text-xs font-medium ${isDark ? "text-[#a49e96]" : "text-[#6b5f51]"}`}>{card.label}</p>
                <p className="text-2xl font-bold tracking-tight mt-1">{card.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.badge}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Category Toolbar */}
      <div className={`p-3.5 sm:p-4 rounded-2xl border flex flex-col sm:flex-row gap-3 ${surfaceClass}`}>
        <div className="relative flex-1">
          <Search
            className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
              isDark ? "text-[#868078]" : "text-[#8c7e6d]"
            }`}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search ticket ID, issue title, or student name..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition ${inputClass}`}
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`px-4 py-2.5 rounded-xl border text-sm font-medium outline-none sm:w-52 transition cursor-pointer ${inputClass}`}
        >
          <option value="All">All Categories</option>
          <option value="IT">IT & Labs</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water & Plumbing</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Tickets Table */}
      <div className={`rounded-2xl border overflow-hidden ${surfaceClass}`}>
        {filteredComplaints.length === 0 ? (
          <div className="p-14 text-center">
            <div
              className={`w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center ${
                isDark ? "bg-[#2a2733] text-[#8d867e]" : "bg-[#f1eadc] text-[#8c7e6d]"
              }`}
            >
              <Inbox className="w-6 h-6" />
            </div>
            <h2 className="text-base font-semibold">No Matching Complaints</h2>
            <p className={`text-sm mt-1 max-w-sm mx-auto ${isDark ? "text-[#a49e96]" : "text-[#6b5f51]"}`}>
              No tickets match your current search or category filter. Reset filters to view all entries.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className={`text-[11px] font-semibold uppercase tracking-wider border-b ${
                    isDark
                      ? "bg-[#19171e] text-[#9e978e] border-[#322f3c]"
                      : "bg-[#f3ece0] text-[#6b5f51] border-[#e2d8c7]"
                  }`}
                >
                  <th className="py-3.5 px-5">Ticket ID</th>
                  <th className="py-3.5 px-5">Subject & Reporter</th>
                  <th className="py-3.5 px-5">Category</th>
                  <th className="py-3.5 px-5">Priority</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className={`divide-y text-sm ${isDark ? "divide-[#2e2b37]" : "divide-[#ebe2d2]"}`}>
                {filteredComplaints.map((item) => (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      isDark ? "hover:bg-[#27242e]" : "hover:bg-[#f4ede0]"
                    }`}
                  >
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span
                        className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                          isDark
                            ? "bg-[#82193a]/25 text-[#fee3c5] border-[#82193a]/50"
                            : "bg-[#82193a]/10 text-[#82193a] border-[#82193a]/20"
                        }`}
                      >
                        {item.id}
                      </span>
                    </td>

                    <td className="py-4 px-5 max-w-md">
                      <p className="font-semibold leading-snug">{item.title}</p>
                      <p className={`text-xs mt-1 ${isDark ? "text-[#9a938a]" : "text-[#786b5c]"}`}>
                        {item.studentName} · <span className="font-mono">{item.date}</span>
                      </p>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                          isDark ? "bg-[#2a2733] text-[#dcd6cd]" : "bg-[#efe7d8] text-[#4e4438]"
                        }`}
                      >
                        {item.category}
                      </span>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getPriorityBadge(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <select
                        value={item.status}
                        onChange={(e) => onStatusChange(item.id, e.target.value)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full border outline-none transition cursor-pointer ${getStatusSelectStyle(
                          item.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>

                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onViewDetails(item)}
                          title="View Details"
                          className={`p-2 rounded-xl border transition cursor-pointer ${
                            isDark
                              ? "bg-[#282530] border-[#383442] text-[#dcd6cd] hover:border-[#fee3c5]/50 hover:text-[#fee3c5]"
                              : "bg-[#f5efe4] border-[#dcd0bc] text-[#4e4438] hover:border-[#82193a]/40 hover:text-[#82193a]"
                          }`}
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteClick(item.id)}
                          title="Delete Complaint"
                          className={`p-2 rounded-xl border transition cursor-pointer ${
                            isDark
                              ? "bg-[#282530] border-[#383442] text-[#b8b1a8] hover:bg-rose-950/50 hover:border-rose-800/60 hover:text-rose-300"
                              : "bg-[#f5efe4] border-[#dcd0bc] text-[#6b5f51] hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700"
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}