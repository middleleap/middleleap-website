import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "MiddleLeap — From Strategic Mandate to Market Execution";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const INK = "#080808";
const BONE = "#ECE9E1";
const BODY = "#A8A59E";
const CAPTION = "#87847D";
const EMBER = "#E65C2D";

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
          background: INK,
          padding: "64px 80px 58px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 7,
                background: "#DEDBD4",
              }}
            />
            <div
              style={{
                width: 46,
                height: 46,
                marginLeft: 18,
                borderRadius: 7,
                background: "linear-gradient(135deg,#F0722E,#CE451B)",
                transform: "rotate(45deg)",
              }}
            />
            <div
              style={{
                display: "flex",
                marginLeft: 38,
                fontFamily: "Arial, sans-serif",
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ color: "#DEDBD4" }}>Middle</span>
              <span style={{ color: EMBER }}>Leap</span>
            </div>
          </div>
          <div
            style={{
              color: CAPTION,
              fontFamily: "monospace",
              fontSize: 17,
              letterSpacing: "0.2em",
            }}
          >
            {"// REGULATED PLATFORM TRANSFORMATION"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: BONE,
              fontFamily: "Georgia, serif",
              fontSize: 82,
              fontWeight: 400,
              lineHeight: 1.08,
            }}
          >
            From strategic mandate
          </div>
          <div
            style={{
              display: "flex",
              color: BONE,
              fontFamily: "Georgia, serif",
              fontSize: 82,
              fontWeight: 400,
              lineHeight: 1.08,
            }}
          >
            <span style={{ marginRight: 20 }}>to</span>
            <span style={{ color: EMBER, fontStyle: "italic" }}>
              market execution.
            </span>
          </div>
          <div
            style={{
              maxWidth: 900,
              marginTop: 26,
              color: BODY,
              fontFamily: "Arial, sans-serif",
              fontSize: 28,
              lineHeight: 1.45,
            }}
          >
            Platform strategy, ecosystems and AI-native operating models for
            regulated financial services.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 10,
              height: 10,
              marginRight: 18,
              background: EMBER,
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              color: CAPTION,
              fontFamily: "monospace",
              fontSize: 18,
              letterSpacing: "0.08em",
            }}
          >
            middleleap.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
