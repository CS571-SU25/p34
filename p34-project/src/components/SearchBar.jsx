import React from "react";

export default function SearchBar({ value, onChange, placeholder = "Search cards..." }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Search cards"
      style={{
        padding: "0.5rem",
        margin: "1rem 0",
        width: "100%",
        boxSizing: "border-box"
      }}
    />
  );
}