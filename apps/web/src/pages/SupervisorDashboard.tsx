import { useState } from "react";
import { Card } from "../components/ui/Card";
import { RequestCard, type RequestCardData } from "../components/request/RequestCard";
import { BottomTabBar, type Tab } from "../components/layout/BottomTabBar";

// Placeholder data — Milestone 3 wires this to the real API.
const SAMPLE_REQUESTS: RequestCardData[] = [
  {
    id: "req_1",
    materialName: "19mm Commercial Ply",
    quantity: 12,
    unit: "No.",
    priority: "HIGH",
    status: "NONE",
    supervisorName: "Pankaj",
    siteName: "Villa 02",
    createdAt: "27 Jul, 10:20 AM",
    updatedAt: "27 Jul, 10:20 AM",
    attachmentCount: 2,
  },
  {
    id: "req_2",
    materialName: "PVC Pipe 1.5 inch",
    quantity: 40,
    unit: "ft",
    priority: "MEDIUM",
    status: "ORDERED",
    supervisorName: "Pankaj",
    siteName: "Villa 02",
    createdAt: "26 Jul, 4:05 PM",
    updatedAt: "27 Jul, 9:00 AM",
  },
];

const TABS: Tab[] = [
  { key: "home", label: "Home", icon: <HomeIcon /> },
  { key: "sites", label: "Sites", icon: <SitesIcon /> },
  { key: "create", label: "New", icon: <PlusIcon /> },
];

export function SupervisorDashboard() {
  const [tab, setTab] = useState("home");

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-20">
      <header className="sticky top-0 z-10 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 px-5 py-4 backdrop-blur">
        <p className="text-xs text-[var(--color-ink-faint)]">Supervisor</p>
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">Pankaj</h1>
      </header>

      <main className="mx-auto max-w-md px-5 py-5">
        <div className="mb-5 grid grid-cols-2 gap-3">
          <Card className="!bg-[var(--color-surface)]">
            <p className="text-2xl font-semibold text-[var(--color-ink)]">8</p>
            <p className="text-xs text-[var(--color-ink-muted)]">My Sites</p>
          </Card>
          <Card className="!bg-[var(--color-surface)]">
            <p className="text-2xl font-semibold text-[var(--color-ink)]">2</p>
            <p className="text-xs text-[var(--color-ink-muted)]">Pending Requests</p>
          </Card>
        </div>

        <h2 className="mb-3 text-sm font-semibold text-[var(--color-ink-muted)]">
          Recent Requests
        </h2>
        <div className="flex flex-col gap-3">
          {SAMPLE_REQUESTS.map((r) => (
            <RequestCard key={r.id} data={r} onOpen={(id) => console.log("open", id)} />
          ))}
        </div>
      </main>

      <BottomTabBar tabs={TABS} active={tab} onChange={setTab} />
    </div>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 9.5 10 3l7 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 8.5V16a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function SitesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2 3 6v8l7 4 7-4V6l-7-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 10v8M3 6l7 4 7-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6.5v7M6.5 10h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
