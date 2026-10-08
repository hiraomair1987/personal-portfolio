import { ImageResponse } from "next/og";

export const alt = "Aetherion — Journeys beyond the horizon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview: the wordmark over a rising planet, in brand colours. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 120,
          background: "radial-gradient(80% 60% at 50% 0%, #142A45 0%, #081322 70%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 10, color: "#72CFC5", textTransform: "uppercase" }}>Journeys beyond the horizon</div>
        <div style={{ marginTop: 24, fontSize: 108, letterSpacing: 26, color: "#D6B46A", fontFamily: "serif" }}>AETHERION</div>
        <div style={{ marginTop: 22, width: 80, height: 3, background: "#72CFC5", borderRadius: 2 }} />
        <div
          style={{
            position: "absolute",
            left: 100,
            top: 430,
            width: 1000,
            height: 1000,
            borderRadius: 9999,
            background: "radial-gradient(circle at 40% 18%, #9fd3ff 0%, #1f5fa8 30%, #071a35 62%)",
            boxShadow: "0 -6px 60px 0 rgba(114,207,197,0.55)",
          }}
        />
      </div>
    ),
    size,
  );
}
