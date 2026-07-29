import { useState } from "react";

type InfoPopoverProps = {
  requestId: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * Small "ⓘ" in the top-right of a request card.
 * Tapping it opens metadata WITHOUT triggering the card's own onClick
 * (stopPropagation is required since the whole card is also clickable).
 */
export function InfoPopover({ requestId, createdAt, updatedAt }: InfoPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Request details"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--color-ink-faint)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
          <rect x="7.3" y="6.8" width="1.4" height="4.6" rx="0.7" fill="currentColor" />
          <rect x="7.3" y="4.4" width="1.4" height="1.4" rx="0.7" fill="currentColor" />
        </svg>
      </button>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-8 z-10 w-56 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-3 text-left text-xs shadow-[var(--shadow-card-active)]"
        >
          <Row label="Request ID" value={requestId} />
          <Row label="Created" value={createdAt} />
          <Row label="Updated" value={updatedAt} />
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 py-0.5">
      <span className="text-[var(--color-ink-faint)]">{label}</span>
      <span className="font-medium text-[var(--color-ink)]">{value}</span>
    </div>
  );
}
