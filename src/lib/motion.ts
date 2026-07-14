/**
 * The one motion vocabulary for the whole site. Every animated component
 * imports its curve and timings from here — the same curve also lives in
 * CSS as `--ease-luxe`. Change it in both places or not at all.
 */
export const EASE_LUXE = [0.16, 1, 0.3, 1] as const;

/** Soft spring for count-ups and magnetic pulls. */
export const SPRING_SOFT = { stiffness: 120, damping: 24 } as const;

/** Snappier spring for pointer-follow (magnetic buttons). */
export const SPRING_MAGNET = { stiffness: 220, damping: 18, mass: 0.6 } as const;

/** Shared durations (seconds). */
export const DUR = { fast: 0.5, base: 0.9, slow: 1.2 } as const;
