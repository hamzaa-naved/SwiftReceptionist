import { Reveal } from "@/components/shared/reveal";

const stats = [
  { value: "2", unit: "rings", label: "to a live answer", gradient: true },
  { value: "24/7", unit: "", label: "nights, weekends, holidays" },
  { value: "3+", unit: "calls", label: "handled at once" },
  { value: "0", unit: "", label: "contracts — cancel by email" },
];

/** Four hard numbers between hairlines. No adjectives. */
export function StatBar() {
  return (
    <div className="border-y border-line bg-snow">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-10 px-6 py-12 sm:px-10 md:grid-cols-4 md:py-14">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div className="text-center">
              <p className="font-display text-4xl sm:text-5xl">
                <span
                  className={s.gradient ? "bg-clip-text text-transparent" : "text-carbon-950"}
                  style={
                    s.gradient
                      ? { backgroundImage: "linear-gradient(135deg, #0a84ff, #7c3aed)" }
                      : undefined
                  }
                >
                  {s.value}
                </span>
                {s.unit && (
                  <span className="ml-2 text-xl font-medium tracking-normal text-carbon-400">
                    {s.unit}
                  </span>
                )}
              </p>
              <p className="mt-2 text-sm text-carbon-600">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
