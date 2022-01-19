import React from "react";
import { WithToolTip } from "#comp/common/ToolTip";
import { returnUnionedClassName, isArray } from "#serv";
import { Link } from "react-router-dom";

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

export const SideBarIconFrame = (props) => {
  return (
    <RoundedBg
      element={props.element}
      className={`${
        props.isActive
          ? `bg-background-800 rounded-2xl text-text-50 hover:text-text-50
             hover:bg-background-700 
             fill-text-50  hover:fill-text-50  
          `
          : "hover:bg-background-400 fill-text-50"
      } hover:text-text-800 hover:fill-text-800 
        bg-background-300 text-text-50 fill-text-50 text-xl gruop`}
    />
  );
};

export const LinkedIcon = ({ to, isActive, element }) => {
  return <Link to={to} element={element} isActive={isActive} />;
};

export const IconWithToolTip = (props) => {
  return (
    <WithToolTip {...props}>
      <UserIcon userdata={props.userdata} />
    </WithToolTip>
  );
};

export const ExpendNavIcons = ({ parentIcon, childIcons }) => {
  return (
    <>
      <div className="w-fit h-fit flex rounded-3xl bg-background-500 bg-opacity-90 z-50 hover:gap-x-2 group">
        <div>{parentIcon}</div>
        {isArray(childIcons) &&
          childIcons.map((childIcon) => (
            <div className="opacity-0 none  w-0 group-hover:opacity-100 group-hover:w-12 transition-all">
              {childIcon}
            </div>
          ))}
      </div>
    </>
  );
};

export default UserIcon;
