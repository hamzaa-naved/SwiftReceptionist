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
          background: "#0a0f1e",
          color: "#faf9f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              marginRight: 8,
            }}
          >
            <div style={{ width: 44, height: 6, borderRadius: 3, background: "#f4560a" }} />
            <div style={{ width: 30, height: 6, borderRadius: 3, background: "#f4560a", opacity: 0.7 }} />
            <div style={{ width: 18, height: 6, borderRadius: 3, background: "#f4560a", opacity: 0.4 }} />
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
            Swift{" "}
            <span style={{ color: "#ff7a29", marginLeft: 10 }}>Receptionist</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>
            Every missed call is a job your competitor just booked.
          </div>
          <div style={{ fontSize: 30, color: "#9aa7c7" }}>
            24/7 AI receptionist for local service businesses
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#f4560a", fontWeight: 600 }}>
          {site.domain}
        </div>
      </div>
    ),
    { ...size },
  );
}
