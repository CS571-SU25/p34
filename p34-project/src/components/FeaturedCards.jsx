import React, { useState, useEffect } from "react";

export default function FeaturedCards() {
  const [cardsByArch, setCardsByArch] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const excludeCards = [
    "Dracotail Phrixl",
    "Dracotail Sting",
    "K9-04 Noroi",
    "K9-666 \"Jacks\"",
    "Marshmao☆Yummy",
    "Yum☆Yum☆Yummys"
  ];

  const archetypes = ["dracotail", "k9", "yummy"];

  function groupMonsters(monsters) {
    const effect = [];
    const fusion = [];
    const synchro = [];
    const xyz = [];
    const other = [];

    monsters.forEach((card) => {
      const type = card.type.toLowerCase();
      if (type.includes("xyz")) xyz.push(card);
      else if (type.includes("synchro")) synchro.push(card);
      else if (type.includes("fusion")) fusion.push(card);
      else if (type.includes("effect")) effect.push(card);
      else other.push(card);
    });

    return [...effect, ...fusion, ...synchro, ...xyz, ...other];
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const results = {};
        for (const arch of archetypes) {
          const res = await fetch(
            `https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${encodeURIComponent(
              arch
            )}`
          );
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          const allCards = (json.data || []).filter(
            (card) => !excludeCards.includes(card.name)
          );

          const monsters = allCards.filter((c) =>
            c.type.toLowerCase().includes("monster")
          );
          const spells = allCards.filter((c) =>
            c.type.toLowerCase().includes("spell")
          );
          const traps = allCards.filter((c) =>
            c.type.toLowerCase().includes("trap")
          );

          const groupedMonsters = groupMonsters(monsters);
          results[arch] = [...groupedMonsters, ...spells, ...traps];
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

  if (loading) return <p style={{ color: "white" }}>Loading featured cards…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const galleryRowStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "2rem"
  };

  const cardImageStyle = {
    width: 150,
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
        textAlign: "left"
      }}
    >
      <h1>Featured Cards</h1>

      {Object.entries(cardsByArch).map(([arch, cards]) => (
        <div key={arch} style={{ marginBottom: "4rem" }}>
          <h2 style={{ borderBottom: "2px solid #fff", paddingBottom: "0.5rem" }}>
            {arch.toUpperCase()}
          </h2>
          <div style={galleryRowStyle}>
            {cards.map((card) => {
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
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              );
            })}
          </div>
        </div>
      ))}

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
          aria-label="Featured card image preview"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Escape" && setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Featured card view"
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
