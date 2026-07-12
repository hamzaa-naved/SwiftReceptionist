import { Check, Minus, X } from "lucide-react";
import { Section, SectionHeader } from "@/components/shared/section";
import { cn } from "@/lib/utils";

/**
 * The comparison as a spec sheet: condensed-caps row labels, mono
 * values, chunky rules — a job ticket, not a SaaS pricing table. The
 * Swift column sits on graphite with volt highlights.
 */
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
      { kind: "text", note: "Per-minute fees" },
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
      <span
        className={cn(
          "font-mono text-xs",
          highlight ? "font-medium text-volt-400" : "text-muted-foreground",
        )}
      >
        {cell.note}
      </span>
    );
  }
  const Icon = cell.kind === "yes" ? Check : cell.kind === "no" ? X : Minus;
  const color =
    cell.kind === "yes"
      ? highlight
        ? "text-live-500"
        : "text-live-600"
      : cell.kind === "no"
        ? "text-destructive"
        : "text-graphite-500";
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className={cn("h-4 w-4 shrink-0", color)} strokeWidth={2.5} aria-hidden />
      <span className="sr-only">
        {cell.kind === "yes" ? "Yes" : cell.kind === "no" ? "No" : "Partially"}
      </span>
      {cell.note && (
        <span
          className={cn(
            "font-mono text-xs",
            highlight ? "text-concrete-50" : "text-muted-foreground",
          )}
        >
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
        title="Who picks up at 9pm?"
        lede="The honest comparison — including the option of changing nothing."
      />
      <div className="overflow-x-auto border-t-[3px] border-graphite-950">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <caption className="sr-only">
            Comparison of call-answering options for local service businesses
          </caption>
          <thead>
            <tr className="border-b-2 border-graphite-950/20">
              <th scope="col" className="py-4 pr-4">
                <span className="sr-only">Feature</span>
              </th>
              {columns.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  className={cn(
                    "px-4 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.12em]",
                    i === columns.length - 1
                      ? "bg-graphite-950 text-volt-400"
                      : "text-graphite-700",
                  )}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-border">
                <th
                  scope="row"
                  className="font-display py-4 pr-4 text-base font-semibold uppercase leading-tight"
                >
                  {row.label}
                </th>
                {row.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className={cn(
                      "px-4 py-4 align-top",
                      ci === row.cells.length - 1 && "bg-graphite-950",
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
