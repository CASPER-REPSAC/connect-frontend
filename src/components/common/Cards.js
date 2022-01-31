import React from "react";
import { IconWithToolTip } from "@/icons/IconFrames";
import { returnUnionedClassName, log } from "#serv";

export const CardFrame = (props) => {
  let newClassName = props.className;
  let prevClassName = `relative rounded-lg transition-all duration-150 ease-in-out bg-background-50 xl:p-4 p-3 hover:shadow-lg hover:bg-background-100`;
  if (props.expended) {
    prevClassName = prevClassName + " w-full h-full ";
  } else if (props.isfit) {
    prevClassName = prevClassName + " w-fit min-w-chapterCard ";
  } else {
    prevClassName =
      prevClassName +
      " min-w-smCard max-w-smCard xl:min-w-tabletCard xl:max-w-tabletCard";
  }

  newClassName = returnUnionedClassName(prevClassName, newClassName);
  log(newClassName);
  return <div {...props} className={newClassName}></div>;
};

export const CardTitle = (props) => {
  return (
    <div {...props} className={returnUnionedClassName(``, props.className)}>
      {props.children}
    </div>
  );
};

export const CardSubTitle = (props) => {
  return (
    <h4
      {...props}
      className={returnUnionedClassName(
        `truncate font-normal`,
        props.className
      )}
    >
      {props.children}
    </h4>
  );
};

export const CardBody = (props) => {
  return (
    <div
      {...props}
      className={returnUnionedClassName(
        `truncate font-normal text-sm`,
        props.className
      )}
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
