import React from "react";
import { returnUnionedClassName, log } from "#serv";

export function Muted({ children, className }) {
  return (
    <span
      className={returnUnionedClassName(
        "font-base ml-2 text-text-500 text-xs leading-6 flex-none",
        className
      )}
    >
      {children}
    </span>
  );
}

export default Muted;
