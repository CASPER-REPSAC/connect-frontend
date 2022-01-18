import React from "react";
import { WithToolTip } from "./ToolTip";
import { returnUnionedClassName } from "#serv";

export const UserIcon = (props) => {
  const { userdata } = props;
  if (props.className) {
    props.className = returnUnionedClassName(
      "w-14 h-14 rounded-md",
      props.className
    );
  }
  return (
    <img
      {...props}
      src={userdata.profile.picture || ""}
      alt={userdata.profile.picture || ""}
      className={`w-14 h-14 rounded-md ${props.className || ""}`}
    />
  );
};

export const RoundedBg = (props) => {
  return (
    <div
      className={returnUnionedClassName(
        "flex items-center justify-around bg-background-400 transition-all rounded-3xl w-12 h-12 hover:rounded-2xl hover:rotate-3 group",
        props.className
      )}
    >
      {props.element || props.children}
    </div>
  );
};

export const IconWithToolTip = (props) => {
  return (
    <WithToolTip {...props}>
      <UserIcon userdata={props.userdata} />
    </WithToolTip>
  );
};

export default UserIcon;
