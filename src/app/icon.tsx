import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Browser-tab icon: white "S" on the signal gradient. */
export default async function Icon() {
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
          borderRadius: 8,
          color: "#ffffff",
          fontFamily: "Geist",
          fontWeight: 600,
          fontSize: 20,
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
