# What the best human receptionists actually do

Research behind Hope's personality. Sources read in full:

- [Best Reception — receptionist training guide](https://www.bestreception.co.uk/receptionist-training-guide/)
- [PipelineOn — Contractor CSR Script](https://pipelineon.com/blog/contractor-csr-script/)
- [ServiceTitan — Contractor Playbook Ch.8: Answering the Phone](https://www.servicetitan.com/guides/contractor-playbook/answering-phone)

## The findings that changed the build

**Immediate name capture is the highest-converting single move.** Trained CSRs get the caller's name within the first few exchanges and then use it repeatedly. It measurably raises booking rate. The mechanism is simple — people disclose more, and argue less, once they've been named.

This is why it became trait 1 rather than a rule. Rules like "ask for the name early" get dropped the moment a caller opens with something dramatic. A disposition — *"you just find it odd talking to a stranger for four minutes"* — survives.

**Reassurance beats expertise for frightened callers.** The single most valuable thing a CSR says to a panicking homeowner is a version of *"oh yeah, we get these all the time."* It converts an unknown, potentially ruinous problem into a routine one. It costs nothing and requires no technical knowledge.

Hope carries this as trait 2, and it's restated in the hazard and urgent node prompts because that's where it earns the most. Gate it on being true.

**Hedging destroys authority; confidence isn't knowledge.** Weak CSRs apologise for what they can't do. Strong ones state it once, warmly, and move on. The reframe that made this work as character rather than instruction: *"Confidence isn't pretending to know things. It's being unbothered about the edges of what you know."*

**"Shopping around" is not an objection.** Callers comparing quotes are behaving reasonably. Defensive counter-selling loses them. The pricing node handles this explicitly.

**Asking the best time to reach someone** is the difference between a callback that connects and one that goes to voicemail. Cheap to ask, materially improves the handoff. It's in the message node.

## The 6-step contractor booking script

The industry-standard sequence trained CSRs follow:

1. Greet with company name and own name
2. Capture caller name, use it
3. Identify the problem
4. **Offer two specific appointment slots**
5. **State the trip/diagnostic fee**
6. Confirm details and set expectations

Hope executes 1, 2, 3 and 6. She structurally cannot do 4 and 5 — no calendar, no pricing authority.

That's correct for a demo, and it's the honest boundary to state to a prospect. It's also the gap the paid product must close: trained human CSRs hit **70–80% booking rate on residential electrical**, and steps 4–5 are where that number comes from.

## The finding nobody wants to hear

Script quality is not what sustains booking rate. **The coaching loop is** — top operators review 5–10 recorded calls per CSR per week and adjust. Without recorded calls and someone listening, performance drifts back toward baseline regardless of how good the prompt is.

This is why `record_voice: true` is in the blueprint's global settings, and why "listen to it" is a verification step rather than a nice-to-have.
