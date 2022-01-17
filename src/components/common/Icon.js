import React from "react";
import { WithToolTip } from "./ToolTip";

export const Icon = (props) => {
  const { userData } = props;
  return (
    <img
      {...props}
      src={userData.profile.picture || ""}
      alt={userData.profile.picture || ""}
      className={`w-14 h-14 rounded-md ${props.className || ""}`}
    />
  );
};

export const IconWithToolTip = (props) => {
  return (
    <WithToolTip {...props}>
      <Icon userData={props.userData} />
    </WithToolTip>
  );
};

export default Icon;
