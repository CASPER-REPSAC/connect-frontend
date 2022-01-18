import React from "react";
import { CasLogoSVG } from "@/icons";

export const AlertFrame = ({ msg }) => {
  return (
    <div>
      <CasLogoSVG />
      <div>{msg}</div>{" "}
    </div>
  );
};

export default AlertFrame;
