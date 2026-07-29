import { Card } from "../ui/Card";
import { StatusPill, type RequestStatus } from "./StatusPill";
import { PriorityTag, type Priority } from "./PriorityTag";
import { InfoPopover } from "./InfoPopover";

export type RequestCardData = {
  id: string;
  materialName: string;
  quantity: number;
  unit?: string;
  priority: Priority;
  status: RequestStatus;
  supervisorName: string;
  siteName: string;
  createdAt: string;
  updatedAt: string;
  attachmentCount?: number;
};

export function RequestCard({
  data,
  onOpen,
}: {
  data: RequestCardData;
  onOpen?: (id: string) => void;
}) {
  return (
    <Card onClick={() => onOpen?.(data.id)} className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[15px] font-semibold text-[var(--color-ink)]">
            {data.materialName}
          </h3>
          <PriorityTag priority={data.priority} />
        </div>
        <InfoPopover
          requestId={data.id}
          createdAt={data.createdAt}
          updatedAt={data.updatedAt}
        />
      </div>

      <p className="text-sm text-[var(--color-ink-muted)]">
        Qty: {data.quantity} {data.unit ?? ""}
      </p>

      <div className="mt-1 flex items-center justify-between">
        <div className="text-xs text-[var(--color-ink-faint)]">
          <span className="font-medium text-[var(--color-ink-muted)]">{data.supervisorName}</span>
          {" · "}
          {data.siteName}
        </div>
        <StatusPill status={data.status} />
      </div>

      {!!data.attachmentCount && (
        <div className="flex items-center gap-1 text-xs text-[var(--color-ink-faint)]">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 8.5V4.5a3 3 0 0 1 6 0v6a2 2 0 0 1-4 0v-5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          {data.attachmentCount} attachment{data.attachmentCount > 1 ? "s" : ""}
        </div>
      )}
    </Card>
  );
}
