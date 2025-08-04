import React, { useState, useEffect, useRef } from "react";
import Fireworks from "./Fireworks";

export default function CountDown() {
  // countdown toward August 1, 2025
  const [timeLeft, setTimeLeft] = useState({
    days:    0,
    hours:   0,
    minutes: 0,
    seconds: 0
  });
  const [showFireworks, setShowFireworks] = useState(false);
  const hasFiredRef = useRef(false);

  useEffect(() => {
    function updateTimer() {
      const target  = new Date("2025-08-01T00:00:00");
      const now     = new Date();
      let   diffMs  = target - now;
      if (diffMs < 0) diffMs = 0;
      const diffSec = Math.floor(diffMs / 1000);
      const secs    = diffSec % 60;
      const diffMin = Math.floor(diffSec / 60);
      const mins    = diffMin % 60;
      const diffHr  = Math.floor(diffMin / 60);
      const hrs     = diffHr % 24;
      const days    = Math.floor(diffHr / 24);

      setTimeLeft({ days, hours: hrs, minutes: mins, seconds: secs });
    }

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, []);

  // when timer hits zero, show fireworks once
  useEffect(() => {
    const { days, hours, minutes, seconds } = timeLeft;
    if (
      !hasFiredRef.current &&
      days === 0 && hours === 0 && minutes === 0 && seconds === 0
    ) {
      hasFiredRef.current = true;
      setShowFireworks(true);
    }
  }, [timeLeft]);

  return (
    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
      <h2>Release Date In.</h2>
      <p>
        {timeLeft.days    + " days "}
        {timeLeft.hours   + " hours "}
        {timeLeft.minutes + " minutes "}
        {timeLeft.seconds + " seconds"}
      </p>

      {showFireworks && <Fireworks />}
    </div>
  );
}