import React, { useState, useEffect, useRef } from "react";
import CountDown from "./CountDown";
import Fireworks from "./Fireworks";

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HomePage() {
  const [allCards, setAllCards]         = useState([]);
  const [currentCards, setCurrentCards] = useState([]);
  const [nextCards, setNextCards]       = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [animating, setAnimating]       = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const containerRef                    = useRef(null);

  const yummyRem      = useRef([]);
  const dragonTailRem = useRef([]);
  const k9Rem         = useRef([]);

  function getNextFor(archetype, poolRef) {
    if (!poolRef.current.length) {
      poolRef.current = shuffle(
        allCards
          .filter(c => (c.archetype || "").toLowerCase() === archetype)
          .map(c => c.card_images?.[0]?.image_url_cropped)
          .filter(Boolean)
      );
    }
    const idx = Math.floor(Math.random() * poolRef.current.length);
    return poolRef.current.splice(idx, 1)[0];
  }

  function drawThree() {
    return [
      getNextFor("yummy", yummyRem),
      getNextFor("dracotail", dragonTailRem),
      getNextFor("k9", k9Rem),
    ];
  }

  
  useEffect(() => {
    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=Justice Hunters")
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then(json => setAllCards(json.data || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);


  useEffect(() => {
    if (allCards.length && currentCards.length === 0) {
      setCurrentCards(drawThree());
    }
  }, [allCards]);

 
  useEffect(() => {
    if (loading || error) return;
    const iv = setInterval(() => {
      setNextCards(drawThree());
      setAnimating(true);
    }, 6000);
    return () => clearInterval(iv);
  }, [loading, error, allCards]);

  
  useEffect(() => {
    if (!animating) return;
    const curr = containerRef.current.querySelector(".slide.current");
    const nxt  = containerRef.current.querySelector(".slide.next");
    requestAnimationFrame(() => {
      curr.style.transform = "translateX(-100%)";
      nxt.style.transform  = "translateX(0)";
    });
    function onEnd() {
      setCurrentCards(nextCards);
      setNextCards([]);
      setAnimating(false);
      curr.style.transition = "none";
      curr.style.transform  = "translateX(0)";
      curr.offsetHeight;
      curr.style.transition = "transform 2s ease-in-out";
    }
    curr.addEventListener("transitionend", onEnd, { once: true });
    return () => curr.removeEventListener("transitionend", onEnd);
  }, [animating, nextCards]);

  if (loading)                   return <p>Loading…</p>;
  if (error)                     return <p>Error: {error}</p>;
  if (currentCards.length !== 3) return <p>Loading…</p>;

  const slideStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    transform: "translateX(0)",
    transition: "transform 2s ease-in-out"
  };

  return (
    <>
      {/* Full‐screen slideshow */}
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden"
        }}
      >
        <div className="slide current" style={slideStyle}>
          {currentCards.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              style={{ flex: 1, objectFit: "cover", width: "33.33%", height: "100%" }}
            />
          ))}
        </div>
        {animating && (
          <div className="slide next" style={{ ...slideStyle, transform: "translateX(100%)" }}>
            {nextCards.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                style={{ flex: 1, objectFit: "cover", width: "33.33%", height: "100%" }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Countdown + persistent fireworks */}
      <div
        className="countdown"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 2,
          pointerEvents: "none",
          fontSize: "3rem",
          color: "#fff",
          textShadow: "0 0 5px rgba(0,0,0,0.7)"
        }}
      >
        <CountDown onComplete={() => setShowFireworks(true)} />
      </div>

      {showFireworks && <Fireworks />}
    </>
  );
}











