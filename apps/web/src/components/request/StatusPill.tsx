export type RequestStatus = "NONE" | "ORDERED" | "NO_STOCK" | "SENT" | "RECEIVED";

const STATUS_LABEL: Record<RequestStatus, string> = {
  NONE: "None",
  ORDERED: "Ordered",
  NO_STOCK: "No Stock",
  SENT: "Sent",
  RECEIVED: "Received",
};

const STATUS_COLOR_VAR: Record<RequestStatus, string> = {
  NONE: "--color-status-none",
  ORDERED: "--color-status-ordered",
  NO_STOCK: "--color-status-nostock",
  SENT: "--color-status-sent",
  RECEIVED: "--color-status-received",
};

export function StatusPill({ status }: { status: RequestStatus }) {
  const colorVar = STATUS_COLOR_VAR[status];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-xs font-medium text-[var(--color-ink)]">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: `var(${colorVar})` }}
      />
      {STATUS_LABEL[status]}
    </span>
  );
}
