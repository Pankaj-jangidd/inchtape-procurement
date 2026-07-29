import { useState } from "react";

type Role = "SUPERVISOR" | "PROCUREMENT";

export function Login() {
  const [role, setRole] = useState<Role>("SUPERVISOR");
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-bg)] px-6">
      <div className="w-full max-w-sm">
        {/* Wordmark — black type, yellow accent, matching the InchTape logo */}
        <div className="mb-10 flex justify-center">
          <span className="text-2xl font-bold tracking-tight text-[var(--color-ink)]">
            inc<span className="text-[var(--color-accent-strong)]">h</span>tape
          </span>
        </div>

        {!showAdmin ? (
          <>
            {/* Segmented Supervisor / Procurement toggle */}
            <div className="mb-6 flex rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1">
              <button
                onClick={() => setRole("SUPERVISOR")}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                  role === "SUPERVISOR"
                    ? "bg-[var(--color-surface-raised)] text-[var(--color-ink)] shadow-[var(--shadow-card)]"
                    : "text-[var(--color-ink-faint)]"
                }`}
              >
                Supervisor
              </button>
              <button
                onClick={() => setRole("PROCUREMENT")}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                  role === "PROCUREMENT"
                    ? "bg-[var(--color-surface-raised)] text-[var(--color-ink)] shadow-[var(--shadow-card)]"
                    : "text-[var(--color-ink-faint)]"
                }`}
              >
                Procurement
              </button>
            </div>

            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent-strong)]"
              />
              <input
                type="password"
                placeholder="Password"
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent-strong)]"
              />
              <button
                type="submit"
                className="mt-2 rounded-xl bg-[var(--color-accent)] py-3 text-sm font-semibold text-[var(--color-accent-ink)] transition-transform active:scale-[0.99]"
              >
                Log in as {role === "SUPERVISOR" ? "Supervisor" : "Procurement"}
              </button>
            </form>

            <button
              onClick={() => setShowAdmin(true)}
              className="mx-auto mt-6 block text-xs text-[var(--color-ink-faint)] underline-offset-2 hover:underline"
            >
              Admin login
            </button>
          </>
        ) : (
          <>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Admin email"
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent-strong)]"
              />
              <input
                type="password"
                placeholder="Password"
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent-strong)]"
              />
              <button
                type="submit"
                className="mt-2 rounded-xl bg-[var(--color-ink)] py-3 text-sm font-semibold text-white transition-transform active:scale-[0.99]"
              >
                Log in as Admin
              </button>
            </form>
            <button
              onClick={() => setShowAdmin(false)}
              className="mx-auto mt-6 block text-xs text-[var(--color-ink-faint)] underline-offset-2 hover:underline"
            >
              ← Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
