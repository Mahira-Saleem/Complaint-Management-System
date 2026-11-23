import { Clock, CheckCircle2, Loader2, FolderKanban, Plus, ArrowUpRight } from "lucide-react";

export default function StudentDashboard({ complaints, onNavigateSubmit, onViewDetails, theme }) {
  const isDark = theme === "dark";

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const inProgress = complaints.filter((c) => c.status === "In Progress").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;

  const recentComplaints = complaints.slice(0, 4);

  const stats = [
    {
      label: "Total Tickets",
      count: total,
      icon: FolderKanban,
      accent: isDark ? "text-[#fee3c5] bg-[#82193a]/30" : "text-[#82193a] bg-[#82193a]/12",
    },
    {
      label: "Pending",
      count: pending,
      icon: Clock,
      accent: isDark ? "text-amber-300 bg-amber-500/15" : "text-amber-800 bg-amber-500/15",
    },
    {
      label: "In Progress",
      count: inProgress,
      icon: Loader2,
      accent: isDark ? "text-sky-300 bg-sky-500/15" : "text-sky-800 bg-sky-500/15",
    },
    {
      label: "Resolved",
      count: resolved,
      icon: CheckCircle2,
      accent: isDark ? "text-emerald-300 bg-emerald-500/15" : "text-emerald-800 bg-emerald-500/15",
    },
  ];

  const getStatusBadge = (status) => {
    if (isDark) {
      const darkMap = {
        Pending: "bg-amber-500/15 text-amber-300 border-amber-500/30",
        "In Progress": "bg-sky-500/15 text-sky-300 border-sky-500/30",
        Resolved: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      };
      return darkMap[status] || "bg-[#2a2730] text-[#d6d0c7] border-[#3a3642]";
    }
    const lightMap = {
      Pending: "bg-amber-100/70 text-amber-900 border-amber-300/70",
      "In Progress": "bg-sky-100/70 text-sky-900 border-sky-300/70",
      Resolved: "bg-emerald-100/70 text-emerald-900 border-emerald-300/70",
    };
    return lightMap[status] || "bg-[#efe7d8] text-[#4a4035] border-[#dfd3be]";
  };

  const cardClass = isDark
    ? "bg-[#1f1d24] border-[#302d38]"
    : "bg-[#fbf8f2] border-[#e2d8c7]";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Student Overview</h1>
          <p className={`text-sm mt-0.5 ${isDark ? "text-[#a9a39b]" : "text-[#6b5f51]"}`}>
            Monitor your submitted facility tickets and resolution progress.
          </p>
        </div>
        <button
          type="button"
          onClick={onNavigateSubmit}
          className="inline-flex items-center justify-center gap-2 bg-[#82193a] hover:bg-[#6b1430] text-[#fee3c5] text-sm font-medium px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          New Complaint
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className={`p-5 rounded-2xl border ${cardClass} flex items-center gap-4`}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.accent}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-xs font-medium ${isDark ? "text-[#a9a39b]" : "text-[#6b5f51]"}`}>{item.label}</p>
                <p className="text-2xl font-bold tracking-tight mt-0.5">{item.count}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`rounded-2xl border overflow-hidden ${cardClass}`}>
        <div className={`px-6 py-4 border-b flex items-center justify-between ${isDark ? "border-[#2e2b36]" : "border-[#e6dccb]"}`}>
          <h2 className="font-semibold text-base">Recent Activity</h2>
          <span className={`text-xs ${isDark ? "text-[#8a837a]" : "text-[#8c7e6d]"}`}>Latest {recentComplaints.length}</span>
        </div>

        {recentComplaints.length === 0 ? (
          <div className={`p-10 text-center text-sm ${isDark ? "text-[#a9a39b]" : "text-[#6b5f51]"}`}>
            No complaints submitted yet. Click &ldquo;New Complaint&rdquo; to report an issue.
          </div>
        ) : (
          <div className={`divide-y ${isDark ? "divide-[#2c2934]" : "divide-[#ebe2d3]"}`}>
            {recentComplaints.map((complaint) => (
              <div
                key={complaint.id}
                onClick={() => onViewDetails(complaint)}
                className={`p-4 sm:px-6 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer ${
                  isDark ? "hover:bg-[#26232c]" : "hover:bg-[#f3ecdf]"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-semibold ${isDark ? "text-[#fee3c5]" : "text-[#82193a]"}`}>
                      {complaint.id}
                    </span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${
                        isDark ? "bg-[#2a2730] text-[#d6d0c7]" : "bg-[#efe7d8] text-[#5c5144]"
                      }`}
                    >
                      {complaint.category}
                    </span>
                  </div>
                  <p className="font-medium mt-1">{complaint.title}</p>
                  <p className={`text-xs mt-0.5 ${isDark ? "text-[#8a837a]" : "text-[#8c7e6d]"}`}>
                    Submitted {complaint.date}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-center">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusBadge(complaint.status)}`}>
                    {complaint.status}
                  </span>
                  <ArrowUpRight className={`w-4 h-4 ${isDark ? "text-[#7a746c]" : "text-[#8c7e6d]"}`} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}