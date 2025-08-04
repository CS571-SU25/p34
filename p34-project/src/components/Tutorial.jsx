import React, { useState } from "react";
import DracotailSample from "../images/Dracotail Sample Deck.png";
import YummySample from "../images/Yummy Sample Deck.png";
import K9Sample from "../images/K-9 sample deck.png";

export default function Tutorial() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const rowStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "1.5rem",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: "0.5rem",
    marginBottom: "2rem",
    flexWrap: "wrap"
  };

  const imageStyle = {
    width: 400,
    height: 315,
    objectFit: "contain",
    cursor: "pointer",
    background: "#001f3f",
    transition: "transform 0.2s"
  };

  const textStyle = {
    maxWidth: "450px",
    color: "white"
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflowY: "auto",
        padding: "1rem",
        backgroundColor: "#001f3f",
        color: "#fff",
        boxSizing: "border-box",
        textAlign: "left"
      }}
    >
      <h1 style={{ textAlign: "center" }}>Tutorials & Sample Decks</h1>

      <h2 style={{ textAlign: "center" }}>Dracotail</h2>
      <div style={rowStyle}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/48Yfze2A6HY"
          title="DragonTail Tutorial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <img
          src={DracotailSample}
          alt="Dracotail Sample Deck"
          style={imageStyle}
          role="button"
          tabIndex={0}
          aria-label="View larger image of Dracotail Sample Deck"
          onClick={() => handleImageClick(DracotailSample)}
          onKeyDown={(e) => e.key === "Enter" && handleImageClick(DracotailSample)}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <div style={textStyle}>
          <p>
            Dracotails combine Dragons and Spellcasters for a new Fusion-based
            Deck theme. Besides powerful new Fusion Monsters and Fusion Spells,
            Dracotail monsters have extra abilities to empower your Fusion
            Summons...
          </p>
        </div>
      </div>

      <h2 style={{ textAlign: "center" }}>Yummy</h2>
      <div style={rowStyle}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/KQBwLf10jtQ"
          title="Yummy Tutorial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <img
          src={YummySample}
          alt="Yummy Sample Deck"
          style={imageStyle}
          role="button"
          tabIndex={0}
          aria-label="View larger image of Yummy Sample Deck"
          onClick={() => handleImageClick(YummySample)}
          onKeyDown={(e) => e.key === "Enter" && handleImageClick(YummySample)}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <div style={textStyle}>
          <p>
            "Yummy" is a Synchro archetype whose Level 2 Synchro Monsters...
          </p>
        </div>
      </div>

      <h2 style={{ textAlign: "center" }}>K9</h2>
      <div style={rowStyle}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/tX351wA1E1s"
          title="K9 Tutorial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <img
          src={K9Sample}
          alt="K9 Sample Deck"
          style={imageStyle}
          role="button"
          tabIndex={0}
          aria-label="View larger image of K9 Sample Deck"
          onClick={() => handleImageClick(K9Sample)}
          onKeyDown={(e) => e.key === "Enter" && handleImageClick(K9Sample)}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <div style={textStyle}>
          <p>
            Who let the dogs out?! Meet the K9 team...
          </p>
        </div>
      </div>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#001f3f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            cursor: "zoom-out"
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Sample deck image preview"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Escape" && setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Sample Deck Enlarged"
            style={{
              maxWidth: "95%",
              maxHeight: "95%",
              objectFit: "contain",
              boxShadow: "0 0 20px rgba(0,0,0,0.5)"
            }}
          />
        </div>
      )}
    </div>
  );
}