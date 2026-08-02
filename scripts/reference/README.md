# Reference scripts

## create-ro-yu-agent.mjs

Recovered 2 Aug 2026 from an untracked file in a local Codex checkout, where it
was the only copy in existence.

Superseded operationally by `scripts/demo.mjs`, but kept because it demonstrates
the correct cloning pattern better than anything else we have:

1. `replaceBrand()` recurses through arrays and nested objects, so no string is
   missed. An earlier version of `demo.mjs` only sanitised the flow's global
   prompt and left node instructions untouched — which meant cloned agents
   greeted callers with the template company's name.
2. Critical nodes are then rewritten explicitly by ID rather than relying on
   find-and-replace alone, which is the only reliable way to handle greetings
   and safety scripts.

Both lessons are now built into `demo.mjs`, along with a post-create audit that
refuses to attach an agent still naming another company.
