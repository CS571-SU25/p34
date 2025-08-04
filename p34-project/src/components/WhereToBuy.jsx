import React from "react";
import CardMarketLogo from "../images/CardMarket.png";
import TCGplayerLogo from "../images/TCGplayer.png";
import EBayLogo from "../images/EBay.png";
import AmazonLogo from "../images/Amazon.png";
import CoolStuffIncLogo from "../images/CoolStuffInc.png";

export default function WhereToBuy() {
  const logoStyle = {
    width: 150,
    height: "auto",
    cursor: "pointer",
    filter: "drop-shadow(0 0 4px rgba(0,0,0,0.5))",
    transition: "transform 0.2s"
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        padding: "2rem",
        backgroundColor: "#001f3f",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box"
      }}
    >
      <h2>Where To Buy</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
          alignItems: "center",
          marginTop: "1.5rem"
        }}
      >
        {[
          { src: CardMarketLogo, alt: "Cardmarket", url: "https://www.cardmarket.com" },
          { src: TCGplayerLogo, alt: "TCGplayer", url: "https://www.tcgplayer.com" },
          { src: EBayLogo, alt: "eBay", url: "https://www.ebay.com" },
          { src: AmazonLogo, alt: "Amazon", url: "https://www.amazon.com" },
          { src: CoolStuffIncLogo, alt: "CoolStuffInc", url: "https://www.coolstuffinc.com" }
        ].map((logo) => (
          <a
            key={logo.alt}
            href={logo.url}
            target="_blank"
            rel="noreferrer"
            aria-label={"Visit " + logo.alt}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              style={logoStyle}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && window.open(logo.url, "_blank")}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </a>
        ))}
      </div>
    </div>
  );
}