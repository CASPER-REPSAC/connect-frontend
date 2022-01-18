import React from "react";
import { returnUnionedClassName } from "#serv";

export const WithToolTip = (props) => {
  const prevClassName = "relative b-0 group";
  const className = returnUnionedClassName(prevClassName, props.className);
  const offsets = {
    bottom:
      "top-16 -left-1/4 after:absolute after:-top-1/4 after:right-1/2 after:border-transparent after:border-b-background-700",
    top: "bottom-16 -left-1/4 after:absolute after:-bottom-1/4 after:right-1/2 after:border-transparent after:border-t-background-700",
    left: "bottom-4 right-16 text-sm after:absolute after:bottom-1/4 after:left-24 after:border-transparent after:border-l-background-700",
    right:
      "top-4 left-16 text-sm after:absolute after:bottom-1/2 after:right-24 after:border-transparent after:border-r-background-700",
  };
  let offset = "bottom";
  if (props.offset) {
    offset = props.offset;
  }
  return (
    <div {...props} className={className}>
      {props.children}
      <span
        className={returnUnionedClassName(
          `
        opacity-0 scale-0 rotate-12 transition-all text-text-50
        group-hover:opacity-90 group-hover:scale-100 group-hover:rotate-0
        p-1 w-24 bg-background-700 z-50
        text-center rounded-md absolute after:border-4 text-sm

        ${offsets[offset]}
         `,
          props.tooltipclassname
        )}
      >
        {props.tooltip}
      </span>
    </div>
  );
};

export default WithToolTip;
