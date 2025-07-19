import React, { useState, useEffect } from "react";

export default function CountDown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(function() {
    function updateTimer() {
      var target   = new Date("2025-08-01T00:00:00");
      var now      = new Date();
      var diffMs   = target - now;
      if (diffMs < 0) {
        diffMs = 0;
      }
      var diffSec  = Math.floor(diffMs / 1000);
      var secs     = diffSec % 60;
      var diffMin  = Math.floor(diffSec / 60);
      var mins     = diffMin % 60;
      var diffHour = Math.floor(diffMin / 60);
      var hours    = diffHour % 24;
      var days     = Math.floor(diffHour / 24);
      setTimeLeft({
        days: days,
        hours: hours,
        minutes: mins,
        seconds: secs
      });
    }

    updateTimer();
    var timerId = setInterval(updateTimer, 1000);
    return function() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
      <h2>Release Date In...</h2>
      <p>
        {timeLeft.days   + " days "}
        {timeLeft.hours  + " hours "}
        {timeLeft.minutes+ " minutes "}
        {timeLeft.seconds+ " seconds"}
      </p>
    </div>
  );
}