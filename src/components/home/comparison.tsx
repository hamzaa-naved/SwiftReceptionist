import { Check, Minus, X } from "lucide-react";
import { Section, SectionHeader } from "@/components/shared/section";
import { cn } from "@/lib/utils";

type Cell = { kind: "yes" | "no" | "partial"; note?: string } | { kind: "text"; note: string };

const columns = [
  "What you do today",
  "Human receptionist",
  "Call-center service",
  "Swift Receptionist",
] as const;

const rows: { label: string; cells: Cell[] }[] = [
  {
    label: "Answers nights & weekends",
    cells: [
      { kind: "no", note: "Voicemail" },
      { kind: "no", note: "9–5 only" },
      { kind: "partial", note: "Extra cost" },
      { kind: "yes", note: "Always on" },
    ],
  },
  {
    label: "Picks up in seconds, every time",
    cells: [
      { kind: "no", note: "Only when free" },
      { kind: "partial", note: "One call at a time" },
      { kind: "partial", note: "Hold queues" },
      { kind: "yes", note: "Unlimited lines" },
    ],
  },
  {
    label: "Knows your trade & prices",
    cells: [
      { kind: "yes", note: "It's you" },
      { kind: "partial", note: "After training" },
      { kind: "no", note: "Generic scripts" },
      { kind: "yes", note: "Built to your setup" },
    ],
  },
  {
    label: "Books jobs on your calendar",
    cells: [
      { kind: "partial", note: "When you can" },
      { kind: "yes" },
      { kind: "no", note: "Takes messages" },
      { kind: "yes" },
    ],
  },
  {
    label: "Flags real emergencies to you",
    cells: [
      { kind: "no", note: "If you hear it ring" },
      { kind: "partial" },
      { kind: "partial" },
      { kind: "yes", note: "Instant escalation" },
    ],
  },
  {
    label: "Monthly cost",
    cells: [
      { kind: "text", note: "“Free” + lost jobs" },
      { kind: "text", note: "$3,000+ w/ payroll" },
      { kind: "text", note: "Per-minute fees add up" },
      { kind: "text", note: "Flat rate, no contract" },
    ],
  },
  {
    label: "Sick days, turnover, training",
    cells: [
      { kind: "text", note: "You never get a day off" },
      { kind: "no", note: "All three" },
      { kind: "partial", note: "Agent roulette" },
      { kind: "yes", note: "None" },
    ],
  },
];

function CellContent({ cell, highlight }: { cell: Cell; highlight?: boolean }) {
  if (cell.kind === "text") {
    return (
      <span className={cn("text-sm", highlight ? "font-semibold text-paper" : "text-muted-foreground")}>
        {cell.note}
      </span>
    );
  }
  const Icon = cell.kind === "yes" ? Check : cell.kind === "no" ? X : Minus;
  const color =
    cell.kind === "yes"
      ? highlight
        ? "text-flame-400"
        : "text-success-600"
      : cell.kind === "no"
        ? "text-destructive"
        : "text-muted-foreground";
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className={cn("h-4 w-4 shrink-0", color)} aria-hidden />
      <span className="sr-only">
        {cell.kind === "yes" ? "Yes" : cell.kind === "no" ? "No" : "Partially"}
      </span>
      {cell.note && (
        <span className={cn("text-xs", highlight ? "text-ink-300" : "text-muted-foreground")}>
          {cell.note}
        </span>
      )}
    </span>
  );
}

export function Comparison() {
  return (
    <Section>
      <SectionHeader
        kicker="Your real options"
        title="You're already paying for a receptionist. In lost jobs."
        lede="Here's the honest comparison — including the option of changing nothing."
      />
      <div className="overflow-x-auto rounded-2xl border border-border shadow-card">
        <table className="w-full min-w-[720px] border-collapse bg-card text-left">
          <caption className="sr-only">
            Comparison of call-answering options for local service businesses
          </caption>
          <thead>
            <tr>
              <th scope="col" className="p-4" />
              {columns.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  className={cn(
                    "p-4 text-sm font-bold",
                    i === columns.length - 1
                      ? "rounded-t-xl bg-ink-950 text-flame-400"
                      : "text-ink-700",
                  )}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={row.label} className={ri % 2 ? "bg-paper-warm/60" : undefined}>
                <th scope="row" className="p-4 text-sm font-semibold">
                  {row.label}
                </th>
                {row.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className={cn(
                      "p-4 align-top",
                      ci === row.cells.length - 1 &&
                        cn("bg-ink-950", ri === rows.length - 1 && "rounded-b-xl"),
                    )}
                  >
                    <CellContent cell={cell} highlight={ci === row.cells.length - 1} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
