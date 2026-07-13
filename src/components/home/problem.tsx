import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

const problems = [
  {
    n: "i",
    title: "The call rings out",
    body: "You're in a panel, up a ladder, or driving. The customer with a right-now problem gets six rings and silence. They don't think 'he must be busy' — they think 'next number.'",
  },
  {
    n: "ii",
    title: "Voicemail finishes the job",
    body: "Most emergency callers won't leave a message, and the ones who do keep dialing while they wait. By the time you call back at six, someone else's truck is already in their driveway.",
  },
  {
    n: "iii",
    title: "You never even know",
    body: "The worst part: lost calls don't show up anywhere. No invoice, no complaint, no record. Just a quieter month, and a competitor who seems to be everywhere lately.",
  },
];

export function Problem() {
  return (
    <Section>
      <SectionHeader
        kicker="No. 01 — The leak"
        title="You don't have a marketing problem. You have an answering problem."
        lede="You already paid — in ads, in reputation, in years of work — to make that phone ring. Here is how the job leaks out anyway."
      />
      <div className="grid gap-px overflow-hidden border-y border-line bg-line md:grid-cols-3">
        {problems.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.12} className="h-full">
            <div className="group flex h-full flex-col bg-ivory p-8 transition-colors duration-500 hover:bg-ivory-raised md:p-10">
              <span className="font-display text-3xl italic text-brass-500">
                {p.n}
              </span>
              <h3 className="font-display mt-6 text-2xl font-medium leading-tight">
                {p.title}
              </h3>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-espresso-700">
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
