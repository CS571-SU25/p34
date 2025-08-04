import React from "react";

export default function Credentials() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        padding: "1rem",
        backgroundColor: "#001f3f",
        color: "#fff",
        boxSizing: "border-box",
        display: "flex",           
        justifyContent: "center",  
        alignItems: "center",      
        textAlign: "center"
      }}
    >
      <div>
        <p>
          All images and cards are owned by Konami and all elements displayed on this
          page fall under fair use and non-profit
        </p>
        <p>
          This website is not affiliated with Konami or any of its subsidiaries. It is
          a fan-made project for educational and entertainment purposes only.
        </p>
        <p>
          Furthermore, any of the logos by Cardmarket, Amazon, Tcgplayer, Ebay, Amazon,
          and Coolstuff.inc are the property of their respective owners.
        </p>
      </div>
    </div>
  );
}