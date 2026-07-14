import type { Niche } from "./types";
import { electrical } from "./electrical";
import { garageDoor } from "./garage-door";

/**
 * Niche registry. Order matters: index 0 is the flagship niche featured
 * across the site (homepage demo block, demo default), and the array
 * order is the display order everywhere niches are listed.
 * To add a niche, create its file and add it here — nothing else.
 *
 * Deliberately just two: electrical (flagship) and garage door. Depth
 * over breadth — the site sells specialization, so the registry stays
 * short on purpose.
 */
export const niches: Niche[] = [electrical, garageDoor];

export function getNiche(slug: string): Niche | undefined {
  return niches.find((n) => n.slug === slug);
}

export type { Niche } from "./types";
