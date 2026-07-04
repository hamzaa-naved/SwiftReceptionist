import type { Niche } from "./types";
import { septic } from "./septic";
import { garageDoor } from "./garage-door";
import { treeService } from "./tree-service";
import { wellPump } from "./well-pump";
import { selfStorage } from "./self-storage";

/**
 * Niche registry. Order matters: it's the display order on the homepage
 * and /industries. To add a niche, create its file and add it here.
 */
export const niches: Niche[] = [
  septic,
  garageDoor,
  treeService,
  wellPump,
  selfStorage,
];

export function getNiche(slug: string): Niche | undefined {
  return niches.find((n) => n.slug === slug);
}

export type { Niche } from "./types";
