import { Check, Minus, X } from "lucide-react";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/** The honest comparison, as a clean white card. Azure marks the answer. */
type Cell = { kind: "yes" | "no" | "partial"; note?: string } | { kind: "text"; note: string };

const columns = ["Today", "A human hire", "A call centre", "Swift"] as const;

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
    { kind: "text", note: "Lost jobs" }, { kind: "text", note: "$3,000+" }, { kind: "text", note: "Per-minute" }, { kind: "text", note: "Flat rate" } ] },
];

function CellContent({ cell, highlight }: { cell: Cell; highlight?: boolean }) {
  if (cell.kind === "text") {
    return (
      <span className={cn("text-sm", highlight ? "font-semibold text-carbon-950" : "text-carbon-600")}>
        {cell.note}
      </span>
    );
  }
  const Icon = cell.kind === "yes" ? Check : cell.kind === "no" ? X : Minus;
  const color =
    cell.kind === "yes"
      ? highlight ? "text-azure-600" : "text-good"
      : cell.kind === "no"
        ? "text-bad/60"
        : "text-carbon-400";
  return (
    <span className="inline-flex items-center gap-2">
      <Icon className={cn("h-4 w-4 shrink-0", color)} strokeWidth={2.5} aria-hidden />
      <span className="sr-only">
        {cell.kind === "yes" ? "Yes" : cell.kind === "no" ? "No" : "Partially"}
      </span>
      {cell.note && (
        <span className={cn("text-xs", highlight ? "text-carbon-600" : "text-carbon-400")}>
          {cell.note}
        </span>
      )}
    </span>
  );
}

export function Comparison() {
  return (
    <Section tone="cloud">
      <SectionHeader
        kicker="Your options"
        title="Who answers at 9 PM?"
        lede="The honest comparison — including the option of changing nothing."
        align="center"
      />
      <Reveal>
        <div className="overflow-x-auto rounded-3xl border border-line bg-white shadow-card">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <caption className="sr-only">Comparison of call-answering options</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="py-5 pl-6 pr-4 sm:pl-8" />
                {columns.map((col, i) => (
                  <th
                    key={col}
                    scope="col"
                    className={cn(
                      "px-5 py-5 text-[0.72rem] font-semibold uppercase tracking-[0.12em]",
                      i === columns.length - 1 ? "text-azure-600" : "text-carbon-400",
                    )}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={row.label} className={cn(ri < rows.length - 1 && "border-b border-line")}>
                  <th
                    scope="row"
                    className="py-5 pl-6 pr-4 text-[0.95rem] font-medium leading-tight text-carbon-950 sm:pl-8"
                  >
                    {row.label}
                  </th>
                  {row.cells.map((cell, ci) => (
                    <td
                      key={ci}
                      className={cn(
                        "px-5 py-5 align-middle",
                        ci === row.cells.length - 1 && "bg-azure-600/[0.04]",
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
      </Reveal>
    </Section>
  );
}
