import { X, Calendar, Tag, AlertTriangle, User } from "lucide-react";

export default function ComplaintModal({ complaint, onClose, theme }) {
  if (!complaint) return null;

  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className={`rounded-2xl max-w-lg w-full p-6 border shadow-2xl ${
          isDark
            ? "bg-[#1f1d24] border-[#312e39] text-[#ece8e1]"
            : "bg-[#fbf8f2] border-[#e2d8c7] text-[#2a2520]"
        }`}
      >
        <div className={`flex items-start justify-between gap-4 border-b pb-4 ${isDark ? "border-[#2e2b36]" : "border-[#e6dccb]"}`}>
          <div>
            <span className={`text-xs font-mono font-semibold ${isDark ? "text-[#fee3c5]" : "text-[#82193a]"}`}>
              {complaint.id}
            </span>
            <h2 className="text-lg font-bold mt-0.5">{complaint.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              isDark ? "text-[#a9a39b] hover:bg-[#2a2730]" : "text-[#6b5f51] hover:bg-[#efe7d8]"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4">
          <div className={`grid grid-cols-2 gap-3 text-sm ${isDark ? "text-[#a9a39b]" : "text-[#6b5f51]"}`}>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 opacity-75" />
              <span>Category: <strong className={isDark ? "text-[#ece8e1]" : "text-[#2a2520]"}>{complaint.category}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 opacity-75" />
              <span>Priority: <strong className={isDark ? "text-[#ece8e1]" : "text-[#2a2520]"}>{complaint.priority}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 opacity-75" />
              <span>Date: <strong className={isDark ? "text-[#ece8e1]" : "text-[#2a2520]"}>{complaint.date}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 opacity-75" />
              <span>By: <strong className={isDark ? "text-[#ece8e1]" : "text-[#2a2520]"}>{complaint.studentName}</strong></span>
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? "bg-[#17161b] border-[#2e2b36]" : "bg-[#f3ecdf] border-[#e2d8c7]"}`}>
            <p className={`text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${isDark ? "text-[#8a837a]" : "text-[#8c7e6d]"}`}>
              Description
            </p>
            <p className={`text-sm leading-relaxed ${isDark ? "text-[#d6d0c7]" : "text-[#3d362e]"}`}>
              {complaint.description}
            </p>
          </div>
        </div>

        <div className={`flex items-center justify-between pt-4 border-t ${isDark ? "border-[#2e2b36]" : "border-[#e6dccb]"}`}>
          <span className={`text-xs ${isDark ? "text-[#a9a39b]" : "text-[#6b5f51]"}`}>
            Status: <strong className={isDark ? "text-[#ece8e1]" : "text-[#2a2520]"}>{complaint.status}</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#82193a] hover:bg-[#6b1430] text-[#fee3c5] text-sm font-medium rounded-xl transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}