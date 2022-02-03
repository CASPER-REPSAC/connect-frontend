import React from "react";
import { WithToolTip } from "#comp/common/ToolTip";
import { returnUnionedClassName, isArray } from "#serv";
import { Link } from "react-router-dom";

export const UserIcon = (props) => {
  const { userdata } = props;

  return (
    <img
      {...props}
      src={userdata.profile.picture || ""}
      alt={userdata.profile.picture || ""}
      className={returnUnionedClassName(
        `w-12 h-12 rounded-3xl `,
        props.className
      )}
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
      <UserIcon userdata={props.userdata} className={props.className} />
    </WithToolTip>
  );
};

export const SideBarIconFrame = ({
  to,
  element,
  isActive,
  onClick,
  tooltip,
  offset,
}) => {
  return (
    <Link to={to || ""} onClick={onClick}>
      <WithToolTip tooltip={tooltip} offset={offset || "right"}>
        <RoundedBg
          element={element}
          className={
            isActive
              ? `bg-background-800 rounded-2xl text-text-50 hover:text-text-50
             hover:bg-background-700 
             fill-text-50  hover:fill-text-50 text-xl gruop
          `
              : `hover:bg-background-500 fill-text-50 
          
        bg-background-400 text-text-50 text-xl group
          `
          }
        />
      </WithToolTip>
    </Link>
  );
};

export const ExpendableIcons = ({ parentIcon, childIcons, search, focus }) => {
  let className = `opacity-0 scale-0 none w-0 group-hover:opacity-100 group-hover:scale-100 transition-all group-hover:w-12`;
  return (
    <>
      <div className="w-fit h-fit flex rounded-3xl bg-background-600 bg-opacity-90 z-30 hover:gap-x-2 group">
        <div>{parentIcon}</div>
        {isArray(childIcons) &&
          childIcons.map((childIcon, index) => (
            <div key={index} className={className}>
              {childIcon}
            </div>
          ))}
      </div>
    </>
  );
};

export default UserIcon;
