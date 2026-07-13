import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Indefinite article for a noun ("a"/"an"), by leading sound. */
export function articleFor(noun: string): "a" | "an" {
  return /^[aeiou]/i.test(noun.trim()) ? "an" : "a";
}
