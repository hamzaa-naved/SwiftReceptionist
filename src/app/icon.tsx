import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Browser-tab icon: the brand mark (ink square, flame speed lines, handset). */
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
          <rect width="32" height="32" rx="9" fill="#0a0f1e" />
          <path d="M4.5 11.5h9" stroke="#f4560a" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M4.5 16h6.5" stroke="#f4560a" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
          <path d="M4.5 20.5h4" stroke="#f4560a" strokeWidth="2.4" strokeLinecap="round" opacity="0.4" />
          <path
            d="M20.4 9.6c.5-.9 1.6-1.3 2.5-.8l2.6 1.4c.9.5 1.3 1.5.9 2.4l-.7 1.7a1.9 1.9 0 0 1-2 1.1c.1 1.5.6 2.9 1.5 4.1a1.9 1.9 0 0 1 2.3-.2l1.5 1.1c.8.6 1 1.7.5 2.6l-1.4 2.5c-.5.9-1.6 1.3-2.5.8-4.9-2.7-7.8-8-7.3-13.6.1-1 .8-1.8 1.7-2l.4-1.1Z"
            fill="#faf9f6"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
