import React from "react";
import { Icon, IconWithToolTip } from "./Icon";

export const CardFrame = (props) => {
  return (
    <div
      {...props}
      className={`min-w-card max-w-card rounded-lg overflow-hidden shadow-lg bg-background-50 p-5 ${
        props.className || ""
      }`}
    ></div>
  );
};

export const CardTitle = (props) => {
  return (
    <h3 {...props} className={`truncate font-bold ${props.className || ""}`}>
      {props.children}
    </h3>
  );
};

export const CardSubTitle = (props) => {
  return (
    <h4
      {...props}
      className={`truncate font-medium text-sm ${props.className || ""}`}
    >
      {props.children}
    </h4>
  );
};

export const CardBody = (props) => {
  return (
    <div
      {...props}
      className={`truncate font-normal text-sm ${props.className || ""}`}
    >
      {props.children}
    </div>
  );
};

export const Card = {
  Frame: CardFrame,
  Title: CardTitle,
  SubTitle: CardSubTitle,
  Body: CardBody,
  Icon: IconWithToolTip,
};

export default Card;
