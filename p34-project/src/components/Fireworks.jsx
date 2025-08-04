import React, { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Fireworks() {
  useEffect(() => {
    
    confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });

   
    const interval = setInterval(() => {
      confetti({
        particleCount: 60,
        spread: 50,
        startVelocity: 30,
        origin: { x: Math.random(), y: Math.random() * 0.5 + 0.2 },
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return null;
}