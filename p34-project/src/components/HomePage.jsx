import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import CountDown from "./CountDown";
import boxImg from "../images/JUSH-Display-01-US-cropped.jpeg";



function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HomePage() {
  const [allCards, setAllCards] = useState([]);
  const [currentCards, setCurrentCards] = useState([]);
  const [nextCards, setNextCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const containerRef = useRef(null);

  // three separate “remaining” pools
  const yummyRem = useRef([]);
  const dragonTailRem = useRef([]);
  const k9Rem = useRef([]);

  // helper to get one random image from a pool, refilling if empty
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

  // draw three in one call
  function drawThree() {
    return [
      getNextFor("yummy", yummyRem),
      getNextFor("dragon tail", dragonTailRem),
      getNextFor("k9", k9Rem)
    ];
  }

  // 1️⃣ initial fetch
  useEffect(() => {
    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then(json => {
        setAllCards(json.data || []);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // 2️⃣ seed initial three as soon as allCards arrives
  useEffect(() => {
    if (allCards.length && currentCards.length === 0) {
      setCurrentCards(drawThree());
    }
  }, [allCards]);

  // 3️⃣ schedule slide every 6s
  useEffect(() => {
    if (loading || error) return;
    const iv = setInterval(() => {
      setNextCards(drawThree());
      setAnimating(true);
    }, 6000);
    return () => clearInterval(iv);
  }, [loading, error, allCards]);

  // 4️⃣ animate transition
  useEffect(() => {
    if (!animating) return;
    const curr = containerRef.current.querySelector(".slide.current");
    const nxt = containerRef.current.querySelector(".slide.next");
    requestAnimationFrame(() => {
      curr.style.transform = "translateX(-100%)";
      nxt.style.transform = "translateX(0)";
    });
    function onEnd() {
      setCurrentCards(nextCards);
      setNextCards([]);
      setAnimating(false);
      curr.style.transition = "none";
      curr.style.transform = "translateX(0)";
      curr.offsetHeight;  // reflow
      curr.style.transition = "transform 2s ease-in-out";
    }
    curr.addEventListener("transitionend", onEnd, { once: true });
    return () => curr.removeEventListener("transitionend", onEnd);
  }, [animating, nextCards]);

  // toggle sidebar
  function toggleSidebar() {
    setSidebarOpen(open => !open);
  }

  // render guards
  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;
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

  const sidebarWidth = 200;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>
      {/* Sidebar toggle */}
      <button
        onClick={toggleSidebar}
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1000,
          fontSize: "1.5rem",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          padding: "0.5rem 1rem",
          cursor: "pointer"
        }}
      >
        ☰
      </button>

      {/* Slide-out sidebar */}
      <div style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100%",
        width: sidebarOpen ? sidebarWidth : 0,
        background: "#000",
        color: "#000",
        overflowX: "hidden",
        transition: "width 0.3s ease",
        zIndex: 900,
        paddingTop: sidebarOpen ? "4rem" : 0
      }}>
        {sidebarOpen && (
          <nav style={{ display: "flex", flexDirection: "column", marginLeft: 16 }}>
            <Link to="/cardlist" style={linkStyle}>Card List</Link>
            <Link to="/credentials" style={linkStyle}>Credentials</Link>
            <Link to="/tutorial" style={linkStyle}>Tutorial</Link>
          </nav>
        )}
      </div>

      {/* Full‐screen slideshow */}
      <div ref={containerRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        <div className="slide current" style={slideStyle}>
          {currentCards.map((src, i) => (
            <img key={i} src={src} alt=""
              style={{ flex: 1, width: "33.33%", height: "100%", objectFit: "cover" }}
            />
          ))}
        </div>
        {animating && (
          <div className="slide next" style={{ ...slideStyle, transform: "translateX(100%)" }}>
            {nextCards.map((src, i) => (
              <img key={i} src={src} alt=""
                style={{ flex: 1, width: "33.33%", height: "100%", objectFit: "cover" }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Countdown */}
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
        <CountDown />
      </div>
    </div>
  );
}

// sidebar link style
const linkStyle = {
  color: "#fff",  // pure white
  textDecoration: "none",
  fontSize: "1.1rem",
  padding: "0.5rem 0"
};













