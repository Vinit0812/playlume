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
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #141414 0%, #1e293b 65%, #141414 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0c0a09",
              fontSize: 30,
              fontWeight: 900,
            }}
          >
            V&amp;A
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.02em" }}>
              V&amp;A GLOBAL SOURCING
            </span>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#fbbf24", letterSpacing: "0.14em" }}>
              B2B WHOLESALE TRADING &amp; DISTRIBUTION INDIA
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.12, maxWidth: 960 }}>
            Factory-Direct Wholesale Lots Across 6 Core Retail Divisions
          </div>
          <div style={{ fontSize: 24, color: "#cbd5e1", maxWidth: 920 }}>
            Toys &amp; Games · Clothing &amp; Apparel · Artificial Jewellery · Consumer Electronics · Home &amp; Kitchen · Fashion Accessories
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            fontSize: 20,
            fontWeight: 700,
            color: "#fbbf24",
            borderTop: "1px solid #334155",
            paddingTop: 24,
          }}
        >
          <span>Verified MOQs</span>
          <span>•</span>
          <span>100% GST &amp; E-Way Billing</span>
          <span>•</span>
          <span>Pan-India Surface Dispatch</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
