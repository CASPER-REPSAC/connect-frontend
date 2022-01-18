import React from "react";
import { returnUnionedClassName } from "#serv";

export const GitIssueSVG = (props) => {
  return (
    <svg
      aria-hidden="true"
      width={props.width || props.height || "100"}
      height={props.width || props.height || "100"}
      viewBox="0 0 16 16"
      version="1.1"
      data-view-component="true"
      class="octicon octicon-issue-opened UnderlineNav-octicon d-none d-sm-inline"
    >
      <path
        d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        className={returnUnionedClassName("fill-black", props.className)}
      ></path>
      <path
        fillRule="evenodd"
        className={returnUnionedClassName("fill-black", props.className)}
        d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
      ></path>
    </svg>
  );
};

export default GitIssueSVG;
