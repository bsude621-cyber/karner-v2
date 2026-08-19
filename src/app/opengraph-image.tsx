import { ImageResponse } from "next/og";

export const alt = "KARNER — Yazılım ve Medya";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Marka paleti: globals.css --background / --accent / --accent-light
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#05060a",
          padding: "80px 96px",
        }}
      >
        <div
          style={{
            width: 120,
            height: 8,
            backgroundColor: "#7b3fe4",
            borderRadius: 4,
            marginBottom: 40,
          }}
        />
        <div
          style={{
            fontSize: 120,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "0.18em",
          }}
        >
          KARNER
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 38,
            color: "#a371ff",
          }}
        >
          Yazılım ve Medya — 3D Web · Mobil · AI Video · SEO/GEO/AEO
        </div>
      </div>
    ),
    { ...size },
  );
}
