import { LogOut, LayoutDashboard, PlusCircle, FileText, Sun, Moon } from "lucide-react";

export default function Navbar({ user, activeTab, setActiveTab, onLogout, theme, onToggleTheme }) {
  const isDark = theme === "dark";

  return (
    <header
      className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${
        isDark
          ? "bg-[#161519]/90 border-[#2b2932] text-[#ece8e1]"
          : "bg-[#f5efe4]/90 border-[#e2d8c7] text-[#2a2520]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#82193a] text-[#fee3c5] flex items-center justify-center font-bold tracking-tight shadow-xs">
              RD
            </div>
            <div>
              <span className="font-semibold tracking-tight text-base">ResolveDesk</span>
              <span
                className={`ml-2.5 text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold border ${
                  isDark
                    ? "bg-[#232129] text-[#c7c1b8] border-[#34313c]"
                    : "bg-[#efe7d8] text-[#5c5144] border-[#dfd3be]"
                }`}
              >
                {user.role}
              </span>
            </div>
          </div>

          {user.role === "student" && (
            <nav className="hidden md:flex items-center gap-1">
              {[
                { id: "dashboard", label: "Overview", icon: LayoutDashboard },
                { id: "submit", label: "New Ticket", icon: PlusCircle },
                { id: "my-complaints", label: "My Tickets", icon: FileText },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition cursor-pointer ${
                      active
                        ? "bg-[#82193a] text-[#fee3c5]"
                        : isDark
                        ? "text-[#a9a39b] hover:text-[#ece8e1] hover:bg-[#232129]"
                        : "text-[#63584b] hover:text-[#2a2520] hover:bg-[#ebe2d2]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          )}

          <div className="flex items-center gap-2.5">
            <span
              className={`hidden sm:inline text-sm font-medium pr-1 ${
                isDark ? "text-[#a9a39b]" : "text-[#63584b]"
              }`}
            >
              {user.name}
            </span>

            <button
              type="button"
              onClick={onToggleTheme}
              title={isDark ? "Switch to Warm Cream Theme" : "Switch to Charcoal Theme"}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                isDark
                  ? "bg-[#211f26] border-[#34313c] text-[#fee3c5] hover:bg-[#2a2730]"
                  : "bg-[#fbf8f2] border-[#dfd3be] text-[#5c5144] hover:bg-[#efe7d8]"
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onLogout}
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-xl border transition cursor-pointer ${
                isDark
                  ? "border-[#34313c] text-rose-400 hover:bg-rose-950/35"
                  : "border-[#dfd3be] text-rose-700 hover:bg-rose-100/60"
              }`}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {user.role === "student" && (
          <div className={`flex md:hidden border-t py-2 gap-1.5 ${isDark ? "border-[#2b2932]" : "border-[#e2d8c7]"}`}>
            {[
              { id: "dashboard", label: "Overview" },
              { id: "submit", label: "New Ticket" },
              { id: "my-complaints", label: "My Tickets" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-lg transition ${
                  activeTab === tab.id
                    ? "bg-[#82193a] text-[#fee3c5]"
                    : isDark
                    ? "bg-[#211f26] text-[#a9a39b]"
                    : "bg-[#ebe2d2] text-[#5c5144]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}