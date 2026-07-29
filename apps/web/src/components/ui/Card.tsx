import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

/**
 * Base tile used everywhere in the app — requests, sites, summary counts.
 * Entire card is clickable when onClick is passed (per spec: no "Open Details" buttons).
 */
export function Card({ children, onClick, className = "" }: CardProps) {
  const interactive = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (interactive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`
        rounded-[var(--radius-card)] border border-[var(--color-border)]
        bg-[var(--color-surface-raised)] p-4
        shadow-[var(--shadow-card)]
        ${interactive ? "cursor-pointer transition-shadow hover:shadow-[var(--shadow-card-active)] active:scale-[0.99]" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
