import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "../lib/api";
import { useAuth } from "../context/AuthContext";

type Role = "SUPERVISOR" | "PROCUREMENT";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState<Role>("SUPERVISOR");
  const [showAdmin, setShowAdmin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginApi(email, password);

      login(data.token, data.user);

      switch (data.user.role) {
        case "SUPERVISOR":
          navigate("/supervisor");
          break;

        case "PROCUREMENT":
          navigate("/procurement");
          break;

        case "ADMIN":
          navigate("/admin");
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-bg)] px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex justify-center">
          <span className="text-2xl font-bold tracking-tight text-[var(--color-ink)]">
            inc<span className="text-[var(--color-accent-strong)]">h</span>tape
          </span>
        </div>

        {!showAdmin ? (
          <>
            <div className="mb-6 flex rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1">
              <button
                onClick={() => setRole("SUPERVISOR")}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold ${
                  role === "SUPERVISOR"
                    ? "bg-[var(--color-surface-raised)] shadow"
                    : ""
                }`}
              >
                Supervisor
              </button>

              <button
                onClick={() => setRole("PROCUREMENT")}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold ${
                  role === "PROCUREMENT"
                    ? "bg-[var(--color-surface-raised)] shadow"
                    : ""
                }`}
              >
                Procurement
              </button>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder={
                  role === "SUPERVISOR"
                    ? "supervisor@inchtape.com"
                    : "procurement@inchtape.com"
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border px-4 py-3"
              />

              <input
                type="password"
                placeholder={
                  role === "SUPERVISOR" ? "supervisor123" : "procurement123"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border px-4 py-3"
              />

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                disabled={loading}
                type="submit"
                className="rounded-xl bg-yellow-400 py-3 font-semibold"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <button
              onClick={() => {
                setShowAdmin(true);
                setEmail("");
                setPassword("");
                setError("");
              }}
              className="mx-auto mt-6 block text-xs underline"
            >
              Admin login
            </button>
          </>
        ) : (
          <>
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="admin@inchtape.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border px-4 py-3"
              />

              <input
                type="password"
                placeholder="admin123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border px-4 py-3"
              />

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                disabled={loading}
                type="submit"
                className="rounded-xl bg-black py-3 font-semibold text-white"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <button
              onClick={() => {
                setShowAdmin(false);
                setEmail("");
                setPassword("");
                setError("");
              }}
              className="mx-auto mt-6 block text-xs underline"
            >
              ← Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
