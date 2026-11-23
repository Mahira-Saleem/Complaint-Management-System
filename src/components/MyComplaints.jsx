import { Eye, Inbox } from "lucide-react";

export default function MyComplaints({ complaints, onViewDetails, theme }) {
  const isDark = theme === "dark";

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

  if (complaints.length === 0) {
    return (
      <div className={`rounded-2xl border p-12 text-center ${cardClass}`}>
        <Inbox className={`w-11 h-11 mx-auto mb-3 ${isDark ? "text-[#57525e]" : "text-[#c4b6a1]"}`} />
        <h2 className="text-lg font-semibold">No Complaints Found</h2>
        <p className={`text-sm mt-1 ${isDark ? "text-[#a9a39b]" : "text-[#6b5f51]"}`}>
          You haven&apos;t submitted any complaints under this account yet.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border overflow-hidden ${cardClass}`}>
      <div className={`px-6 py-4 border-b ${isDark ? "border-[#2e2b36]" : "border-[#e6dccb]"}`}>
        <h1 className="text-lg font-bold tracking-tight">My Submitted Complaints</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className={`text-[11px] uppercase tracking-wider border-b ${
                isDark
                  ? "bg-[#18161c] text-[#9b948b] border-[#2e2b36]"
                  : "bg-[#f2ebde] text-[#6b5f51] border-[#e2d8c7]"
              }`}
            >
              <th className="py-3.5 px-6">ID</th>
              <th className="py-3.5 px-6">Title</th>
              <th className="py-3.5 px-6">Category</th>
              <th className="py-3.5 px-6">Date</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6 text-right">Details</th>
            </tr>
          </thead>
          <tbody className={`divide-y text-sm ${isDark ? "divide-[#2c2934]" : "divide-[#ebe2d3]"}`}>
            {complaints.map((item) => (
              <tr
                key={item.id}
                className={`transition ${isDark ? "hover:bg-[#26232c]" : "hover:bg-[#f3ecdf]"}`}
              >
                <td className={`py-4 px-6 font-mono font-semibold whitespace-nowrap ${isDark ? "text-[#fee3c5]" : "text-[#82193a]"}`}>
                  {item.id}
                </td>
                <td className="py-4 px-6 font-medium">{item.title}</td>
                <td className={`py-4 px-6 ${isDark ? "text-[#a9a39b]" : "text-[#63584b]"}`}>{item.category}</td>
                <td className={`py-4 px-6 whitespace-nowrap ${isDark ? "text-[#a9a39b]" : "text-[#6b5f51]"}`}>{item.date}</td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => onViewDetails(item)}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                      isDark
                        ? "bg-[#26232c] border-[#36323f] text-[#ece8e1] hover:bg-[#302c38]"
                        : "bg-[#f3ecdf] border-[#dcd0bc] text-[#4a4035] hover:bg-[#eae0ce]"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}