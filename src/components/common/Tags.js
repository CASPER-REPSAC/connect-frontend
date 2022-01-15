import React from "react";

export const Tag = (props) => {
  return (
    <span
      {...props}
      className={`inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-skin-text-500 mr-1 mt-1 ${
        props.className || ""
      }`}
      style={{ backgroundColor: props.bgColor || "" }}
    ></span>
  );
};

export default Tag;
