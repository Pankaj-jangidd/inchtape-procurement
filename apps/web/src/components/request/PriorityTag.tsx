export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

const CONFIG: Record<Priority, { label: string; classes: string }> = {
  URGENT: {
    label: "URGENT",
    classes: "bg-[var(--color-priority-urgent)] text-white",
  },
  HIGH: {
    label: "HIGH PRIORITY",
    // The one place we let yellow carry real weight — matches the spec's
    // [HIGH PRIORITY] tag example, and it's the accent's whole job in this app.
    classes: "bg-[var(--color-accent)] text-[var(--color-accent-ink)]",
  },
  MEDIUM: {
    label: "MEDIUM",
    classes: "bg-[var(--color-surface)] text-[var(--color-ink-muted)] border border-[var(--color-border)]",
  },
  LOW: {
    label: "LOW",
    classes: "bg-[var(--color-surface)] text-[var(--color-ink-faint)] border border-[var(--color-border)]",
  },
};

export function PriorityTag({ priority }: { priority: Priority }) {
  if (priority === "MEDIUM" || priority === "LOW") return null; // only surface tags that need attention
  const { label, classes } = CONFIG[priority];
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide ${classes}`}>
      {label}
    </span>
  );
}
