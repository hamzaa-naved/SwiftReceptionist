import { Check, Minus, X } from "lucide-react";
import { Section, SectionHeader } from "@/components/shared/section";
import { cn } from "@/lib/utils";

/**
 * The comparison as an editorial ledger: hairline rules, serif row
 * labels, the Swift column quietly lifted on a warm plate. Refined, not
 * a SaaS pricing table.
 */
type Cell = { kind: "yes" | "no" | "partial"; note?: string } | { kind: "text"; note: string };

const columns = ["Today", "A human hire", "A call centre", "Swift Receptionist"] as const;

const rows: { label: string; cells: Cell[] }[] = [
  { label: "Answers nights & weekends", cells: [
    { kind: "no", note: "Voicemail" }, { kind: "no", note: "9–5" }, { kind: "partial", note: "Extra" }, { kind: "yes", note: "Always" } ] },
  { label: "Picks up in seconds, every time", cells: [
    { kind: "no", note: "If free" }, { kind: "partial", note: "One at a time" }, { kind: "partial", note: "Queues" }, { kind: "yes", note: "Unlimited" } ] },
  { label: "Knows your trade & prices", cells: [
    { kind: "yes", note: "It's you" }, { kind: "partial", note: "After training" }, { kind: "no", note: "Generic" }, { kind: "yes", note: "Your setup" } ] },
  { label: "Books jobs on your calendar", cells: [
    { kind: "partial", note: "When you can" }, { kind: "yes" }, { kind: "no", note: "Messages" }, { kind: "yes" } ] },
  { label: "Flags real emergencies to you", cells: [
    { kind: "no" }, { kind: "partial" }, { kind: "partial" }, { kind: "yes", note: "Instant" } ] },
  { label: "Monthly cost", cells: [
    { kind: "text", note: "Lost jobs" }, { kind: "text", note: "$3,000+" }, { kind: "text", note: "Per-minute" }, { kind: "text", note: "Flat, no contract" } ] },
];

function CellContent({ cell, highlight }: { cell: Cell; highlight?: boolean }) {
  if (cell.kind === "text") {
    return (
      <span className={cn("text-sm", highlight ? "font-medium text-ivory" : "text-espresso-500")}>
        {cell.note}
      </span>
    );
  }
  const Icon = cell.kind === "yes" ? Check : cell.kind === "no" ? X : Minus;
  const color =
    cell.kind === "yes"
      ? highlight ? "text-brass-400" : "text-live-600"
      : cell.kind === "no"
        ? highlight ? "text-espresso-300" : "text-oxblood-600/70"
        : highlight ? "text-espresso-300" : "text-espresso-500";
  return (
    <span className="inline-flex items-center gap-2">
      <Icon className={cn("h-4 w-4 shrink-0", color)} strokeWidth={1.75} aria-hidden />
      <span className="sr-only">
        {cell.kind === "yes" ? "Yes" : cell.kind === "no" ? "No" : "Partially"}
      </span>
      {cell.note && (
        <span className={cn("text-xs", highlight ? "text-espresso-300" : "text-espresso-500")}>
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
        kicker="No. 05 — The reckoning"
        title="Who picks up at nine at night?"
        lede="The honest comparison — including the option of changing nothing."
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">Comparison of call-answering options</caption>
          <thead>
            <tr className="border-b border-espresso-950/20">
              <th scope="col" className="py-5 pr-4" />
              {columns.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  className={cn(
                    "px-5 py-5 text-[0.68rem] font-medium uppercase tracking-[0.18em]",
                    i === columns.length - 1 ? "bg-espresso-950 text-brass-400" : "text-espresso-500",
                  )}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-line">
                <th scope="row" className="font-display py-5 pr-4 text-lg font-medium leading-tight">
                  {row.label}
                </th>
                {row.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className={cn("px-5 py-5 align-middle", ci === row.cells.length - 1 && "bg-espresso-950")}
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
