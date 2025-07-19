import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router"; 
import CountDown from "./CountDown";
import boxImg from "../images/JUSH-Display-01-US-cropped.jpeg";

export default function HomePage() {
  const [allCards,     setAllCards]     = useState([]);
  const [currentCards, setCurrent]      = useState([]);
  const [nextCards,    setNext]         = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [animating,    setAnimating]    = useState(false);
  const containerRef                     = useRef(null);

  const archetypes = ["k9", "yummy", "dragon tail"];

  function pickThree(list = allCards) {
    return archetypes
      .map(arch => {
        const group = list.filter(c =>
          (c.archetype || "").toLowerCase() === arch &&
          c.card_images?.[0]?.image_url_cropped
        );
        if (!group.length) return null;
        const pick = group[Math.floor(Math.random() * group.length)];
        return pick.card_images[0].image_url_cropped;
      })
      .filter(Boolean);
  }

  // Fetch data once and seed the first slide immediately
  useEffect(() => {
    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
      .then(res => {
        if (!res.ok) throw new Error("Status " + res.status);
        return res.json();
      })
      .then(json => {
        const data = json.data || [];
        setAllCards(data);
        setCurrent(pickThree(data));
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Every 6s (4s display + 2s transition), stage next slide
  useEffect(() => {
    if (!allCards.length) return;
    const iv = setInterval(() => {
      setNext(pickThree());
      setAnimating(true);
    }, 6000);
    return () => clearInterval(iv);
  }, [allCards]);

  // Animate slide transition
  useEffect(() => {
    if (!animating) return;
    const curr = containerRef.current.querySelector(".slide.current");
    const next = containerRef.current.querySelector(".slide.next");

    requestAnimationFrame(() => {
      curr.style.transform = "translateX(-100%)";
      next.style.transform = "translateX(0)";
    });

    function onEnd() {
      setCurrent(nextCards);
      setNext([]);
      setAnimating(false);

      curr.style.transition = "none";
      curr.style.transform  = "translateX(0)";
      curr.offsetHeight; // force reflow
      curr.style.transition = "transform 2s ease-in-out";
    }

    curr.addEventListener("transitionend", onEnd, { once: true });
    return () => curr.removeEventListener("transitionend", onEnd);
  }, [animating, nextCards]);

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>Error: {error}</p>;

  const slideStyle = {
    position:   "absolute",
    top:        0,
    left:       0,
    width:      "100%",
    height:     "100%",
    display:    "flex",
    transform:  "translateX(0)",
    transition: "transform 2s ease-in-out"
  };

  return (
    <div style={{
      paddingTop:    "4rem",   // space for your nav/links
      width:         "100vw",
      minHeight:     "100vh",
      boxSizing:     "border-box",
      background:    "#fff",
      overflowX:     "hidden",
      display:       "flex",
      flexDirection: "column",
      alignItems:    "center"
    }}>
      {/* Navigation buttons */}
      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/cardlist">
          <button style={{ marginRight: "0.5rem" }}>Card List</button>
        </Link>
        <Link to="/credentials">
          <button style={{ marginRight: "0.5rem" }}>Credentials</button>
        </Link>
        <Link to="/tutorial">
          <button>Tutorial</button>
        </Link>
      </nav>

      {/* Full-page slideshow */}
      <div
        ref={containerRef}
        style={{
          position:     "relative",
          width:        "100%",    // full page width
          height:       "75vh",    // 75% of viewport height
          overflow:     "hidden",
          marginBottom: "2rem"
        }}
      >
        {/* current slide */}
        <div className="slide current" style={slideStyle}>
          {currentCards.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              style={{
                flex:      1,
                width:     "33.33%",   // three images across
                height:    "100%",
                objectFit: "cover"
              }}
            />
          ))}
        </div>

        {/* next slide */}
        {animating && (
          <div
            className="slide next"
            style={{ ...slideStyle, transform: "translateX(100%)" }}
          >
            {nextCards.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                style={{
                  flex:      1,
                  width:     "33.33%",
                  height:    "100%",
                  objectFit: "cover"
                }}
              />
            ))}
          </div>
        )}

        {/* centered overlay box (optional) */}
        <img
          src={boxImg}
          alt="Justice Hunters Box"
          style={{
            position:      "absolute",
            top:           "50%",
            left:          "50%",
            transform:     "translate(-50%, -50%)",
            maxWidth:      "50vw",
            maxHeight:     "60vh",
            objectFit:     "contain",
            zIndex:        1,
            pointerEvents: "none"
          }}
        />
      </div>

      {/* Countdown below */}
      <CountDown />
    </div>
  );
}








