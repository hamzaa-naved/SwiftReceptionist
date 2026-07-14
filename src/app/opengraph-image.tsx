import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = `${site.name} — 24/7 AI receptionist for electrical contractors and garage door companies`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default Open Graph card: DAYLIGHT — white void, colossal type. */
export default async function OgImage() {
  const assets = join(process.cwd(), "src/assets/og");
  const [geist600, geist400] = await Promise.all([
    readFile(join(assets, "geist-600.ttf")),
    readFile(join(assets, "geist-400.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#0d0d12",
          padding: 88,
          fontFamily: "Geist",
        }}
      >
        {/* Soft aura, upper right */}
        <div
          style={{
            position: "absolute",
            right: -220,
            top: -260,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              "radial-gradient(50% 50% at 50% 50%, rgb(10 132 255 / 0.25) 0%, rgb(124 58 237 / 0.15) 45%, transparent 72%)",
            display: "flex",
          }}
        />

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9999,
              background: "linear-gradient(135deg, #0a84ff, #7c3aed)",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>
            Swift Receptionist
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: 600,
            fontSize: 124,
            lineHeight: 1.0,
            letterSpacing: -5,
          }}
        >
          <div style={{ display: "flex" }}>Every call.</div>
          <div style={{ display: "flex", color: "#a6a6af" }}>Answered.</div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            fontWeight: 400,
            color: "#6e6e78",
          }}
        >
          <div style={{ display: "flex" }}>
            The 24/7 AI receptionist for electrical &amp; garage door companies
          </div>
          <div style={{ display: "flex", color: "#0071e3", fontWeight: 600 }}>
            {site.domain}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geist600, style: "normal", weight: 600 },
        { name: "Geist", data: geist400, style: "normal", weight: 400 },
      ],
    },
  );
}
