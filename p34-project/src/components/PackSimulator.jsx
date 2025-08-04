import React, { useState, useEffect } from "react";
import {Button} from "react-bootstrap";

export default function PackSimulator() {
  const [allCards, setAllCards] = useState([]);
  const [pack, setPack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchCards() {
      try {
        const res = await fetch(
          "https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=Justice Hunters"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setAllCards(json.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCards();
  }, []);

  function openPack() {
    if (!allCards.length) return;
    const shuffled = [...allCards].sort(() => Math.random() - 0.5);
    const newPack = shuffled.slice(0, 9);
    setPack(newPack);
  }

  if (loading) return <p style={{ color: "white" }}>Loading cards…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const packGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "1rem",
    marginTop: "1rem"
  };

  const cardImageStyle = {
    width: "100%",
    cursor: "pointer",
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
        overflowY: "auto",
        padding: "1rem",
        backgroundColor: "#001f3f",
        color: "#fff",
        boxSizing: "border-box",
        textAlign: "center"
      }}
    >
      <h1>Pack Simulator</h1>
      <Button
        variant="primary"
        size="lg"
        onClick={openPack}
        style={{ marginBottom: "1rem" }}
      >
        Open Pack
      </Button>

      {pack.length > 0 && (
        <div style={packGridStyle}>
          {pack.map((card) => {
            const img = card.card_images?.[0]?.image_url_small;
            const fullImg = card.card_images?.[0]?.image_url;

            return (
              <img
                key={card.id}
                src={img}
                alt={card.name}
                style={cardImageStyle}
                role="button"
                tabIndex={0}
                aria-label={"View larger image of " + card.name}
                onClick={() => setSelectedImage(fullImg || img)}
                onKeyDown={(e) => e.key === "Enter" && setSelectedImage(fullImg || img)}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            );
          })}
        </div>
      )}

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
          aria-label="Opened card image preview"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Escape" && setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Card full view"
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