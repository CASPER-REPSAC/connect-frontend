import React from "react";
import { WithToolTip } from "./ToolTip";

export const Icon = (props) => {
  const { userdata } = props;
  return (
    <img
      {...props}
      src={userdata.profile.picture || ""}
      alt={userdata.profile.picture || ""}
      className={`w-14 h-14 rounded-md ${props.className || ""}`}
    />
  );
};

export const IconWithToolTip = (props) => {
  return (
    <WithToolTip {...props}>
      <Icon userdata={props.userdata} />
    </WithToolTip>
  );
};

export default Icon;
