import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Browser-tab icon: the serif "S" maker's-mark on espresso. */
export default async function Icon() {
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
          borderRadius: 6,
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(195, 154, 86, 0.55)",
            borderRadius: 9999,
            color: "#c39a56",
            fontFamily: "Fraunces",
            fontStyle: "italic",
            fontSize: 17,
            // optical centering: italic serif sits a hair low-right
            paddingBottom: 2,
            paddingRight: 1,
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
