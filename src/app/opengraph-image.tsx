import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = `${site.name} — 24/7 AI receptionist for local service businesses`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tick = (pos: React.CSSProperties): React.CSSProperties => ({
  position: "absolute",
  width: 18,
  height: 18,
  ...pos,
});

/** Default Open Graph card, inherited by all pages without their own. */
export default async function OgImage() {
  const assets = join(process.cwd(), "src/assets/og");
  const [frauncesLight, frauncesItalic, instrument] = await Promise.all([
    readFile(join(assets, "fraunces-300.ttf")),
    readFile(join(assets, "fraunces-500-italic.ttf")),
    readFile(join(assets, "instrument-sans-500.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0c0a06",
          color: "#f6f1e7",
          padding: 40,
          fontFamily: "Instrument Sans",
        }}
      >
        {/* Hairline frame with brass corner ticks — the framed-print motif */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: "1px solid #2e2619",
            padding: 56,
          }}
        >
          <div style={{ ...tick({ top: -1, left: -1 }), borderTop: "2px solid #a9803f", borderLeft: "2px solid #a9803f" }} />
          <div style={{ ...tick({ top: -1, right: -1 }), borderTop: "2px solid #a9803f", borderRight: "2px solid #a9803f" }} />
          <div style={{ ...tick({ bottom: -1, left: -1 }), borderBottom: "2px solid #a9803f", borderLeft: "2px solid #a9803f" }} />
          <div style={{ ...tick({ bottom: -1, right: -1 }), borderBottom: "2px solid #a9803f", borderRight: "2px solid #a9803f" }} />

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 34, height: 1, background: "#a9803f", display: "flex" }} />
            <div
              style={{
                fontSize: 21,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#c39a56",
              }}
            >
              24/7 AI receptionist · electrical &amp; garage door
            </div>
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Fraunces",
              fontWeight: 300,
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
            }}
          >
            <div style={{ display: "flex" }}>The call you miss</div>
            <div style={{ display: "flex" }}>
              is the job&nbsp;
              <span
                style={{
                  fontFamily: "Fraunces Italic",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "#c39a56",
                }}
              >
                they get.
              </span>
            </div>
          </div>

          {/* Wordmark row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(195, 154, 86, 0.55)",
                  borderRadius: 9999,
                  color: "#c39a56",
                  fontFamily: "Fraunces Italic",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: 26,
                  paddingBottom: 3,
                }}
              >
                S
              </div>
              <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: 30 }}>
                Swift&nbsp;
                <span
                  style={{
                    fontFamily: "Fraunces Italic",
                    fontStyle: "italic",
                    color: "#c39a56",
                  }}
                >
                  Receptionist
                </span>
              </div>
            </div>
            <div style={{ display: "flex", fontSize: 22, color: "#a99c85" }}>
              {site.domain}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: frauncesLight, style: "normal", weight: 300 },
        { name: "Fraunces Italic", data: frauncesItalic, style: "italic", weight: 500 },
        { name: "Instrument Sans", data: instrument, style: "normal", weight: 500 },
      ],
    },
  );
}
