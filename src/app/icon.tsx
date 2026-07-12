import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Browser-tab icon: volt bolt on graphite panel. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "transparent",
        }}
      >
        <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
          <rect width="32" height="32" rx="3" fill="#191c20" />
          <path d="M17.8 5.5 9.5 17.5h6l-1.3 9 8.3-12h-6z" fill="#ffc400" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
