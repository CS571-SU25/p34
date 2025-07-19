import React from "react";

export default function Tutorial() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>DragonTail</h1>
      {/* YouTube embed for DragonTail – replace DRACOTAIL_ID with the real ID */}
      <div style={{ marginBottom: "2rem" }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/watch?v=K2ako5GD1rc"
          title="DragonTail Tutorial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <h1>Yummy</h1>
      {/* YouTube embed for Yummy */}
      <div style={{ marginBottom: "2rem" }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/watch?v=8MNApEQh9BA"
          title="Yummy Tutorial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <h1>K9</h1>
      {/* YouTube embed for K9 */}
      <div style={{ marginBottom: "2rem" }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/watch?v=tX351wA1E1s"
          title="K9 Tutorial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}