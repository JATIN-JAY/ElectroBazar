import React from "react";

export const Spotlight = ({ className = "" }) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 
      bg-[radial-gradient(circle_at_50%_20%,rgba(99,102,241,0.25),transparent_40%)] 
      ${className}`}
    />
  );
};
