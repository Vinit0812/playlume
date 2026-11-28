import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#181818",
          borderRadius: 64,
          border: "10px solid #f59e0b",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 240,
            height: 240,
            borderRadius: 48,
            background: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
            color: "#0c0a09",
            fontSize: 108,
            fontWeight: 900,
            letterSpacing: "-0.04em",
          }}
        >
          V&amp;A
        </div>
        <div
          style={{
            marginTop: 28,
            color: "#ffffff",
            fontSize: 34,
            fontWeight: 800,
            letterSpacing: "0.06em",
          }}
        >
          GLOBAL SOURCING
        </div>
      </div>
    ),
    {
      width: 512,
      height: 512,
    }
  );
}
