
import { useState, useEffect } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { initialComplaints } from "./data/initialData";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import StudentDashboard from "./components/StudentDashboard";
import SubmitComplaint from "./components/SubmitComplaint";
import MyComplaints from "./components/MyComplaints";
import AdminDashboard from "./components/AdminDashboard";
import ComplaintModal from "./components/ComplaintModal";

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("resolvedesk_theme") || "dark";
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("resolvedesk_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem("resolvedesk_complaints");
    return saved ? JSON.parse(saved) : initialComplaints;
  });

  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("resolvedesk_theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("resolvedesk_complaints", JSON.stringify(complaints));
  }, [complaints]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const showNotification = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("resolvedesk_user", JSON.stringify(userData));
    setActiveTab("dashboard");
    showNotification(`Welcome back, ${userData.name}`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("resolvedesk_user");
  };

  const handleAddComplaint = (newComplaintData) => {
    try {
      const nextNumber = 1001 + complaints.length;
      const newEntry = {
        ...newComplaintData,
        id: `CMP-${nextNumber}`,
        status: "Pending",
        studentEmail: user.email,
        studentName: user.name,
        date: new Date().toISOString().split("T")[0],
      };

      setComplaints([newEntry, ...complaints]);
      setActiveTab("my-complaints");
      showNotification("Complaint submitted successfully.");
    } catch {
      showNotification("Failed to submit complaint. Please try again.", "error");
    }
  };

  const handleStatusChange = (id, newStatus) => {
    try {
      setComplaints((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      showNotification(`Ticket ${id} marked as ${newStatus}.`);
    } catch {
      showNotification("Unable to update ticket status.", "error");
    }
  };

  const handleDeleteComplaint = (id) => {
    try {
      setComplaints((prev) => prev.filter((item) => item.id !== id));
      showNotification(`Ticket ${id} permanently removed.`);
    } catch {
      showNotification("Failed to delete complaint.", "error");
    }
  };

  const isDark = theme === "dark";

  if (!user) {
    return <Login onLogin={handleLogin} theme={theme} onToggleTheme={toggleTheme} />;
  }

  const studentComplaints = complaints.filter((c) => c.studentEmail === user.email);

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? "bg-[#161519] text-[#ece8e1]" : "bg-[#f5efe4] text-[#2a2520]"
      }`}
    >
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium shadow-xl ${
            isDark
              ? "bg-[#232129] border-[#34313c] text-[#ece8e1]"
              : "bg-[#fbf8f2] border-[#e2d8c7] text-[#2a2520]"
          }`}
        >
          {toast.type === "error" ? (
            <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {user.role === "admin" ? (
          <AdminDashboard
            complaints={complaints}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteComplaint}
            onViewDetails={setSelectedComplaint}
            theme={theme}
          />
        ) : (
          <>
            {activeTab === "dashboard" && (
              <StudentDashboard
                complaints={studentComplaints}
                onNavigateSubmit={() => setActiveTab("submit")}
                onViewDetails={setSelectedComplaint}
                theme={theme}
              />
            )}
            {activeTab === "submit" && (
              <SubmitComplaint onAddComplaint={handleAddComplaint} theme={theme} />
            )}
            {activeTab === "my-complaints" && (
              <MyComplaints
                complaints={studentComplaints}
                onViewDetails={setSelectedComplaint}
                theme={theme}
              />
            )}
          </>
        )}
      </main>

      <ComplaintModal
        complaint={selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        theme={theme}
      />
    </div>
  );
}