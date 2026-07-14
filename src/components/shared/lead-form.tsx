"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { niches } from "@/content/niches";
import { leadSchema } from "@/lib/lead-schema";
import { track } from "@/lib/integrations/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FieldErrors = Partial<Record<string, string>>;

export function LeadForm() {
  const [niche, setNiche] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "failed">("idle");
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = leadSchema.safeParse({ ...data, niche });

    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]?.toString() ?? "form";
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!json.ok) throw new Error(json.error ?? "Submission failed");
      setStatus("sent");
      track("lead_form_submitted", { niche: parsed.data.niche || "unspecified" });
    } catch (err) {
      setStatus("failed");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-line bg-white p-8 text-center text-carbon-950 shadow-card">
        <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-good" aria-hidden />
        <h3 className="text-2xl font-semibold tracking-[-0.01em]">Got it — we&apos;ll be quick.</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          We answer fast — it&apos;s literally the business we&apos;re in.
          Expect to hear from us within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-3xl border border-line bg-white p-6 text-carbon-950 shadow-card sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" error={errors.name} autoComplete="name" />
        <Field
          label="Business name"
          name="business"
          error={errors.business}
          autoComplete="organization"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          error={errors.email}
          autoComplete="email"
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          error={errors.phone}
          autoComplete="tel"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-niche">Industry</Label>
        <Select value={niche} onValueChange={setNiche}>
          <SelectTrigger id="lead-niche" className="w-full">
            <SelectValue placeholder="Pick the closest fit" />
          </SelectTrigger>
          <SelectContent>
            {niches.map((n) => (
              <SelectItem key={n.slug} value={n.slug}>
                {n.name}
              </SelectItem>
            ))}
            <SelectItem value="other">Something else</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-message">Anything we should know? (optional)</Label>
        <Textarea
          id="lead-message"
          name="message"
          rows={3}
          placeholder="e.g. We miss most calls between 8am and 3pm when both trucks are out."
        />
      </div>

      {/* Honeypot — hidden from humans, tempting to bots */}
      <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
        <label htmlFor="lead-website">Website</label>
        <input id="lead-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {(serverError || status === "failed") && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {serverError || "Something went wrong — try again or email us."}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send — we'll call you back fast"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        No spam, no newsletter ambush. We use this to call you back, period.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  const id = `lead-${name}`;
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
