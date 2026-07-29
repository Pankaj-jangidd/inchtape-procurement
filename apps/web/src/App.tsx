import { useState } from "react";
import { Login } from "./pages/Login";
import { SupervisorDashboard } from "./pages/SupervisorDashboard";

/**
 * Milestone 0 preview shell.
 * Real routing (React Router, auth guards) lands in Milestone 1.
 * For now: toggle between the two screens to sanity-check the design system.
 */
function App() {
  const [screen, setScreen] = useState<"login" | "dashboard">("login");

  return (
    <>
      {screen === "login" ? <Login /> : <SupervisorDashboard />}

      {/* Milestone 0 dev-only preview switcher — remove once React Router lands */}
      <button
        onClick={() => setScreen(screen === "login" ? "dashboard" : "login")}
        className="fixed right-3 top-3 z-50 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 py-1.5 text-[11px] font-medium text-[var(--color-ink-muted)] shadow-[var(--shadow-card)]"
      >
        Preview: {screen === "login" ? "→ Dashboard" : "→ Login"}
      </button>
    </>
  );
}

export default App;
