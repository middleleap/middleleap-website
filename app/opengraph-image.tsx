import { ImageResponse } from "next/og";

// Required for next/og image routes under `output: export` so the PNG
// is rendered once at build time rather than on demand.
export const dynamic = "force-static";

export const alt = "MiddleLeap — From Process to Product";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Brand colors (mirrors :root tokens in globals.css)
const VOID = "#080808";
const PAPER = "#ece9e1";
const SIGNAL = "#e05a2b";
const FOG = "#666";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: VOID,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top: wordmark + mono label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: 34,
              fontWeight: 700,
              color: PAPER,
              letterSpacing: "-0.02em",
            }}
          >
            Middle
            <span style={{ color: SIGNAL, padding: "0 4px" }}>{">>"}</span>
            Leap
          </div>
          <div
            style={{
              fontSize: 22,
              color: FOG,
              letterSpacing: "0.08em",
            }}
          >
            {"// AI-DLC"}
          </div>
        </div>

        {/* middle: headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: PAPER,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            From Process
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: PAPER,
            }}
          >
            <span style={{ paddingRight: 24 }}>to</span>
            <span style={{ color: SIGNAL }}>Product.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: FOG,
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            The methodology behind the 20× company. 10-person teams,
            200-person output.
          </div>
        </div>

        {/* bottom: signal accent bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{ width: 64, height: 6, background: SIGNAL, marginRight: 20 }}
          />
          <div style={{ fontSize: 22, color: FOG, letterSpacing: "0.04em" }}>
            middleleap.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
