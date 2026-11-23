import { useState } from "react";
import { Send, AlertCircle } from "lucide-react";

export default function SubmitComplaint({ onAddComplaint, theme }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("IT");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  const isDark = theme === "dark";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Please provide both a complaint title and a detailed description.");
      return;
    }

    onAddComplaint({
      title: title.trim(),
      category,
      description: description.trim(),
      priority,
    });

    setTitle("");
    setCategory("IT");
    setDescription("");
    setPriority("Medium");
  };

  const inputClass = isDark
    ? "bg-[#17161b] border-[#312e39] text-[#ece8e1] placeholder:text-[#6f6a63] focus:border-[#82193a]"
    : "bg-[#f6f1e7] border-[#dcd0bc] text-[#2a2520] placeholder:text-[#9c8e7c] focus:border-[#82193a] focus:bg-[#fdfbf7]";

  const labelClass = `block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
    isDark ? "text-[#a9a39b]" : "text-[#63584b]"
  }`;

  return (
    <div
      className={`max-w-2xl mx-auto rounded-2xl border p-6 sm:p-8 ${
        isDark ? "bg-[#1f1d24] border-[#302d38]" : "bg-[#fbf8f2] border-[#e2d8c7]"
      }`}
    >
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight">Submit a Complaint</h1>
        <p className={`text-sm mt-1 ${isDark ? "text-[#a9a39b]" : "text-[#6b5f51]"}`}>
          Share exact location and issue details so staff can take action promptly.
        </p>
      </div>

      {error && (
        <div
          className={`mb-5 p-3.5 rounded-xl border flex items-center gap-2 text-sm ${
            isDark
              ? "bg-rose-950/45 border-rose-900/60 text-rose-300"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelClass}>Complaint Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Lab 2 AC unit leaking water"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition ${inputClass}`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition ${inputClass}`}
            >
              <option value="IT">IT</option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition ${inputClass}`}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Include building name, floor, room number, and what is happening..."
            className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none transition ${inputClass}`}
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-[#82193a] hover:bg-[#6b1430] text-[#fee3c5] text-sm font-medium px-6 py-2.5 rounded-xl transition cursor-pointer"
        >
          <Send className="w-4 h-4" />
          Submit Ticket
        </button>
      </form>
    </div>
  );
}