import React from "react";
import { returnUnionedClassName, log } from "#serv";

export const CasLogoSVG = (props) => {
  log("caslogosvg", props.className);
  return (
    <svg
      width={props.width || props.height || "100"}
      height={props.width || props.height || "100"}
      viewBox={"0 0 60 60"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 17C0 7.61116 7.61116 0 17 0H44C53.3888 0 61 7.61116 61 17V30C61 39.3888 53.3888 47 44 47H17C16.1729 47 15.3596 46.9409 14.5641 46.8268L11.8144 55.7396C11.033 58.2723 8.69199 60 6.04144 60C2.70484 60 0 57.2952 0 53.9586V30V23.6156V17ZM28 14H19V23H28V14ZM43 14H52V23H43V14ZM41.1962 34.5L36 27L30.8038 34.5H41.1962Z"
        className={props.className}
      />
    </svg>
  );
};

export default CasLogoSVG;
