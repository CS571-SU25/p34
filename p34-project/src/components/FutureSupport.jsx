import React, { useState, useEffect } from "react";

export default function FutureSupport() {
  const [cardsByArch, setCardsByArch] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const targetCards = {
    k9: ["K9-04 Noroi", "K9-666 \"Jacks\""],
    yummy: ["Marshmao☆Yummy", "Yum☆Yum☆Yummys"],
    dracotail: ["Dracotail Phrixl", "Dracotail Sting"]
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const archetypes = Object.keys(targetCards);
        const results = {};

        for (const arch of archetypes) {
          const res = await fetch(
            `https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${encodeURIComponent(
              arch
            )}`
          );
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          const data = json.data || [];

          results[arch] = data.filter((card) =>
            targetCards[arch].includes(card.name)
          );
        }

        setCardsByArch(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p style={{ color: "white" }}>Loading future support…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const renderSection = (archetype, cards) => (
    <div key={archetype} style={{ marginBottom: "2rem" }}>
      <h2 style={{ borderBottom: "2px solid #fff", paddingBottom: "0.5rem" }}>
        {archetype.toUpperCase()}
      </h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cards.map((card) => {
          const imgSmall = card.card_images?.[0]?.image_url_small;
          const imgFull = card.card_images?.[0]?.image_url;
          const sets = card.card_sets || [];
          const code = sets[0]?.set_code || "N/A";
          const rarities = sets
            .map((s) => `${s.set_rarity} ${s.set_rarity_code}`)
            .join(", ") || "N/A";

          const descParts = card.desc.split("●").map((part, idx) =>
            idx === 0 ? part.trim() : "●" + part.trim()
          );

          return (
            <li key={card.id} style={{ marginBottom: "2rem" }}>
              {imgSmall && (
                <img
                  src={imgSmall}
                  alt={card.name}
                  style={{
                    width: 120,
                    cursor: "pointer",
                    marginBottom: 8,
                    display: "block",
                    transition: "transform 0.2s"
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={"View larger image of " + card.name}
                  onClick={() => setSelectedImage(imgFull || imgSmall)}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedImage(imgFull || imgSmall)}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              )}
              <strong style={{ display: "block", marginBottom: 4 }}>
                {card.name}
              </strong>
              <em style={{ display: "block", marginBottom: 8 }}>
                {card.type}
              </em>

              {descParts.map((text, i) => (
                <p key={i} style={{ margin: "0.5rem 0" }}>
                  {text}
                </p>
              ))}

              <p style={{ margin: "0.25rem 0", fontStyle: "italic" }}>
                <strong>Set Code:</strong> {code}
              </p>
              <p style={{ margin: "0 0 0.5rem", fontStyle: "italic" }}>
                <strong>Rarities:</strong> {rarities}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );

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
      <h1>Future Support Cards</h1>
      {Object.entries(cardsByArch).map(([arch, cards]) =>
        renderSection(arch, cards)
      )}

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            cursor: "zoom-out"
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Future support card image preview"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Escape" && setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full card view"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              boxShadow: "0 0 20px rgba(0,0,0,0.5)"
            }}
          />
        </div>
      )}
    </div>
  );
}