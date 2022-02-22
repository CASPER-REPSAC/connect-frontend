import React from "react";

export function Muted({ children }) {
  return (
    <span className="font-base ml-2 text-text-500 text-xs leading-6 flex-none">
      {children}
    </span>
  );
}

export default Muted;
