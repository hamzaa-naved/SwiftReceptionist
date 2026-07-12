import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — 24/7 AI receptionist for local service businesses`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default Open Graph card, inherited by all pages without their own. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#191c20",
          color: "#f1f2ef",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 22, height: 22, background: "#ffc400", display: "flex" }} />
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
            SWIFT{" "}
            <span style={{ color: "#ffc400", marginLeft: 12 }}>RECEPTIONIST</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1 }}>
            THE CALL YOU MISS IS THE JOB THEY GET.
          </div>
          <div style={{ fontSize: 30, color: "#aeb4b0" }}>
            24/7 AI receptionist for electrical contractors & the trades
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#ffc400", fontWeight: 600 }}>
          {site.domain}
        </div>
      </div>
    ),
    { ...size },
  );
}
