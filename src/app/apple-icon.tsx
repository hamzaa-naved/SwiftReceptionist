import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon (iOS): volt bolt on graphite panel. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#191c20",
          borderRadius: 24,
        }}
      >
        <svg viewBox="0 0 32 32" width="140" height="140" fill="none">
          <path d="M17.8 4 8.5 17.5h6.5l-1.5 10.5 9.3-13.5h-6.5z" fill="#ffc400" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
