import React from "react";
import { CasLogoSVG as HomeIcon, GitIssueSVG as IssueIcon } from "@/icons";
import { RoundedBg, WithToolTip } from "#comp/common";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSignInAlt,
  faKeyboard,
  faCog,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const navButtons = [
  {
    element: (
      <HomeIcon
        className="fill-background-50 group-hover:fill-background-800"
        width="29px"
      />
    ),
    activeElement: (
      <HomeIcon
        className="fill-background-50 group-hover:fill-background-50"
        width="29px"
      />
    ),
    tooltip: "홈",
    to: "/",
  },
  {
    element: <FontAwesomeIcon icon={faList} className="" />,
    tooltip: "액티비티 목록",
    to: "/activities",
  },
  {
    element: <FontAwesomeIcon icon={faKeyboard} className="" />,
    tooltip: "액티비티 작성",
    to: "/activities/create",
  },
  {
    element: <FontAwesomeIcon icon={faSearch} className="" />,
    tooltip: "검색",
    to: "/search",
  },
  {
    element: (
      <IssueIcon
        className="fill-background-50 group-hover:fill-background-800"
        width="21px"
      />
    ),
    activeElement: (
      <IssueIcon
        className="fill-background-50 group-hover:fill-background-50"
        width="21px"
      />
    ),
    tooltip: "건의 및 제보",
    to: "/issue",
  },
  {
    element: <FontAwesomeIcon icon={faSignInAlt} className="" />,
    tooltip: "구글로 로그인",
    to: "/login",
  },
  {
    element: <FontAwesomeIcon icon={faCog} className="" />,
    tooltip: "설정",
    to: "/settings",
  },
];

export const SideBar = () => {
  let location = useLocation();
  console.log(location);
  return (
    <nav className="min-h-full max-h-full w-16 max-w-16">
      {/* <div>sidebar</div> */}
      <div className="grid justify-around gap-y-2 mt-2 z-10 ">
        {navButtons.map((btn) => (
          <Link to={btn.to} key={btn.to}>
            <WithToolTip
              tooltip={btn.tooltip}
              offset="right"
              tooltipclassname="origin-left rotate-12 min-w-tooltip after:right-[120px] p-3 rounded-2xl"
            >
              <RoundedBg
                className={`${
                  location.pathname === btn.to
                    ? `bg-background-800 rounded-2xl text-text-50 hover:bg-background-700 hover:text-text-50 `
                    : "hover:bg-background-400 min-w-"
                } hover:text-text-800 bg-background-300 text-text-50 gruop text-xl`}
                element={
                  btn.activeElement && location.pathname === btn.to
                    ? btn.activeElement
                    : btn.element
                }
              />
            </WithToolTip>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default SideBar;
