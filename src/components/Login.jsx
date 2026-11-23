import { useState } from "react";
import { Eye, EyeOff, ShieldCheck, GraduationCap, AlertCircle, Sun, Moon } from "lucide-react";

export default function Login({ onLogin, theme, onToggleTheme }) {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const isDark = theme === "dark";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in both email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (role === "admin") {
      if (email === "admin@campus.edu" && password === "admin123") {
        onLogin({ name: "System Admin", email, role: "admin" });
      } else {
        setError("Invalid Admin credentials. Try admin@campus.edu / admin123");
      }
    } else {
      const displayName = email.split("@")[0].replace(".", " ");
      onLogin({
        name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
        email,
        role: "student",
      });
    }
  };

  const fillDemoCredentials = (selectedRole) => {
    setRole(selectedRole);
    setError("");
    if (selectedRole === "admin") {
      setEmail("admin@campus.edu");
      setPassword("admin123");
    } else {
      setEmail("student@campus.edu");
      setPassword("student123");
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between p-4 sm:p-6 transition-colors ${
        isDark ? "bg-[#161519] text-[#ece8e1]" : "bg-[#f5efe4] text-[#2a2520]"
      }`}
    >
      <div className="flex justify-end max-w-6xl w-full mx-auto">
        <button
          type="button"
          onClick={onToggleTheme}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition cursor-pointer ${
            isDark
              ? "bg-[#211f26] border-[#34313c] text-[#ece8e1] hover:bg-[#2a2730]"
              : "bg-[#fbf8f2] border-[#dfd3be] text-[#4a4035] hover:bg-[#efe7d8]"
          }`}
        >
          {isDark ? <Sun className="w-4 h-4 text-[#fee3c5]" /> : <Moon className="w-4 h-4" />}
          <span>{isDark ? "Vanilla Cream" : "Soft Charcoal"}</span>
        </button>
      </div>

      <div className="my-auto py-6">
        <div
          className={`max-w-md w-full mx-auto rounded-2xl border p-7 sm:p-8 shadow-xl ${
            isDark
              ? "bg-[#1f1d24] border-[#312e39]"
              : "bg-[#fbf8f2] border-[#e2d8c7]"
          }`}
        >
          <div className="mb-7">
            <div
              className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium mb-3 ${
                isDark
                  ? "bg-[#82193a]/25 text-[#fee3c5]"
                  : "bg-[#82193a]/12 text-[#82193a]"
              }`}
            >
              Campus Operations Suite
            </div>
            <h1 className="text-2xl font-bold tracking-tight">ResolveDesk</h1>
            <p className={`text-sm mt-1 ${isDark ? "text-[#a9a39b]" : "text-[#6b5f51]"}`}>
              Sign in to submit or resolve facility tickets.
            </p>
          </div>

          <div
            className={`grid grid-cols-2 gap-1.5 p-1 rounded-xl mb-6 border ${
              isDark
                ? "bg-[#17161b] border-[#2d2a34]"
                : "bg-[#efe7d8] border-[#e2d8c7]"
            }`}
          >
            <button
              type="button"
              onClick={() => {
                setRole("student");
                setError("");
              }}
              className={`flex items-center justify-center gap-2 py-2 text-xs sm:text-sm font-medium rounded-lg transition cursor-pointer ${
                role === "student"
                  ? "bg-[#82193a] text-[#fee3c5] shadow-xs"
                  : isDark
                  ? "text-[#a9a39b] hover:text-[#ece8e1]"
                  : "text-[#63584b] hover:text-[#2a2520]"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Student
            </button>
            <button
              type="button"
              onClick={() => {
                setRole("admin");
                setError("");
              }}
              className={`flex items-center justify-center gap-2 py-2 text-xs sm:text-sm font-medium rounded-lg transition cursor-pointer ${
                role === "admin"
                  ? "bg-[#82193a] text-[#fee3c5] shadow-xs"
                  : isDark
                  ? "text-[#a9a39b] hover:text-[#ece8e1]"
                  : "text-[#63584b] hover:text-[#2a2520]"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Admin
            </button>
          </div>

          {error && (
            <div
              className={`mb-4 p-3 rounded-xl border flex items-center gap-2 text-xs sm:text-sm ${
                isDark
                  ? "bg-rose-950/45 border-rose-900/60 text-rose-300"
                  : "bg-rose-50 border-rose-200 text-rose-800"
              }`}
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-[#a9a39b]" : "text-[#63584b]"
                }`}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === "admin" ? "admin@campus.edu" : "student@campus.edu"}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition ${
                  isDark
                    ? "bg-[#17161b] border-[#312e39] text-[#ece8e1] placeholder:text-[#6f6a63] focus:border-[#82193a]"
                    : "bg-[#f6f1e7] border-[#dcd0bc] text-[#2a2520] placeholder:text-[#9c8e7c] focus:border-[#82193a] focus:bg-[#fdfbf7]"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-[#a9a39b]" : "text-[#63584b]"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none pr-10 transition ${
                    isDark
                      ? "bg-[#17161b] border-[#312e39] text-[#ece8e1] placeholder:text-[#6f6a63] focus:border-[#82193a]"
                      : "bg-[#f6f1e7] border-[#dcd0bc] text-[#2a2520] placeholder:text-[#9c8e7c] focus:border-[#82193a] focus:bg-[#fdfbf7]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ${
                    isDark ? "text-[#7a746c] hover:text-[#ece8e1]" : "text-[#8c7e6d] hover:text-[#2a2520]"
                  }`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#82193a] hover:bg-[#6b1430] text-[#fee3c5] font-medium py-2.5 rounded-xl transition cursor-pointer shadow-sm"
            >
              Sign In as {role === "admin" ? "Admin" : "Student"}
            </button>
          </form>

          <div className={`mt-6 pt-5 border-t ${isDark ? "border-[#2e2b36]" : "border-[#e6dccb]"}`}>
            <p className={`text-[11px] uppercase tracking-wider text-center mb-2.5 ${isDark ? "text-[#7a746c]" : "text-[#8c7e6d]"}`}>
              Demo Accounts
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => fillDemoCredentials("student")}
                className={`text-xs py-2 px-3 rounded-xl font-medium border transition cursor-pointer ${
                  isDark
                    ? "bg-[#17161b] border-[#312e39] text-[#d6d0c7] hover:bg-[#26232c]"
                    : "bg-[#f3ecdf] border-[#dcd0bc] text-[#4a4035] hover:bg-[#eae0ce]"
                }`}
              >
                Demo Student
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials("admin")}
                className={`text-xs py-2 px-3 rounded-xl font-medium border transition cursor-pointer ${
                  isDark
                    ? "bg-[#17161b] border-[#312e39] text-[#d6d0c7] hover:bg-[#26232c]"
                    : "bg-[#f3ecdf] border-[#dcd0bc] text-[#4a4035] hover:bg-[#eae0ce]"
                }`}
              >
                Demo Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      <div />
    </div>
  );
}