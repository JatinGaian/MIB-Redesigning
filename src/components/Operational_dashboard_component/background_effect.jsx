import React from "react";

const BackgroundEffect = ({ className = "" }) => (
  <div
    className={`absolute inset-0 z-0 pointer-events-none ${className}`}
    style={{
      background: "radial-gradient(ellipse 80% 40% at 50% 50%, rgba(124,58,237,0.35) 0%, rgba(28,28,30,0.0) 80%)",
      filter: "blur(14px)",
      opacity: 0.85,
      borderRadius: "inherit",
    }}
  />
);

export default BackgroundEffect; 