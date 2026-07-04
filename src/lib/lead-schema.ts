import { z } from "zod";

/** Shared client/server validation for the lead form. */
export const leadSchema = z.object({
  name: z.string().trim().min(2, "Tell us your name").max(80),
  business: z.string().trim().min(2, "What's the business called?").max(120),
  email: z.string().trim().email("That email doesn't look right").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "A phone number we can reach you at")
    .max(25)
    .regex(/^[+()\-.\s\d]+$/, "Digits and + ( ) - only"),
  niche: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  /** Honeypot — humans never see this field; bots fill it. */
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;
