import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Uzay Poyraz - Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#05070a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#e7edf5",
              letterSpacing: "-1px",
            }}
          >
            uzay.dev
          </div>
          <div
            style={{
              width: 60,
              height: 3,
              background: "#4f9cff",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              fontSize: 28,
              color: "#93a1b2",
              fontWeight: 400,
            }}
          >
            CS Graduate, Builder, Explorer
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
