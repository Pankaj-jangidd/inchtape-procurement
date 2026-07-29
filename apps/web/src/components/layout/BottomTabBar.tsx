type Tab = {
  key: string;
  label: string;
  icon: React.ReactNode;
};

export function BottomTabBar({
  tabs,
  active,
  onChange,
}: {
  tabs: Tab[];
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-md justify-around">
        {tabs.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium"
            >
              <span
                className={isActive ? "text-[var(--color-ink)]" : "text-[var(--color-ink-faint)]"}
              >
                {tab.icon}
              </span>
              <span className={isActive ? "text-[var(--color-ink)]" : "text-[var(--color-ink-faint)]"}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute -mt-[3px] h-[3px] w-5 rounded-full bg-[var(--color-accent)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export type { Tab };
