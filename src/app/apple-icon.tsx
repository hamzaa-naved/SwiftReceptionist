import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon (iOS): serif "S" maker's-mark on espresso. */
export default async function AppleIcon() {
  const fraunces = await readFile(
    join(process.cwd(), "src/assets/og/fraunces-500-italic.ttf"),
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
          background: "#17130d",
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid rgba(195, 154, 86, 0.55)",
            borderRadius: 9999,
            color: "#c39a56",
            fontFamily: "Fraunces",
            fontStyle: "italic",
            fontSize: 84,
            paddingBottom: 10,
            paddingRight: 4,
          }}
        >
          S
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "italic", weight: 500 },
      ],
    },
  );
}
