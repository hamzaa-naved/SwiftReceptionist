import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon (iOS): white "S" on the signal gradient. */
export default async function AppleIcon() {
  const geist = await readFile(
    join(process.cwd(), "src/assets/og/geist-600.ttf"),
  );
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a84ff, #7c3aed)",
          color: "#ffffff",
          fontFamily: "Geist",
          fontWeight: 600,
          fontSize: 104,
        }}
      >
        S
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Geist", data: geist, style: "normal", weight: 600 }],
    },
  );
}
