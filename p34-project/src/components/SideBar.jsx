import React, { useState } from "react";
import { Link } from "react-router";

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "1.1rem",
  padding: "0.5rem 0"
};

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarWidth = 200;
  function toggleSidebar() {
    setSidebarOpen(open => !open);
  }

  return (
    <>
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
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: sidebarOpen ? sidebarWidth : 0,
          background: "#000",
          overflowX: "hidden",
          transition: "width 0.3s ease",
          zIndex: 900,
          paddingTop: sidebarOpen ? "4rem" : 0
        }}
        role="navigation"
        aria-label="Primary site navigation"
      >
        {sidebarOpen && (
          <nav style={{ display: "flex", flexDirection: "column", marginLeft: 16 }}>
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/featured" style={linkStyle}>Featured Cards</Link>
            <Link to="/cardlist" style={linkStyle}>Card List</Link>
            <Link to="/futuresupport" style={linkStyle}>Future Support</Link>
            <Link to="/packsimulator" style={linkStyle}>Pack Simulator</Link>
            <Link to="/tutorial" style={linkStyle}>Tutorial</Link>
            <Link to="/wheretobuy" style={linkStyle}>Where To Buy</Link>
            <Link to="/credentials" style={linkStyle}>Credentials</Link>
          </nav>
        )}
      </div>
    </>
  );
}