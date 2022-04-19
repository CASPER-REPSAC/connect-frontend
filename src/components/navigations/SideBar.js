import React from "react";
import {
  GitIssueButton,
  SearchButton,
  ActivityWriteButton,
  HomeButton,
  SettingsButton,
  UserButton,
  GoogleLoginButton,
} from "./SideBarButtons";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { SideChapterList } from "#comp/chapters";
import { ActivityInfo } from "#comp/activities";
import { animated, useSpring } from "react-spring";

export const SideBar = () => {
  const { pathname } = useLocation();
  const { user, profile } = useSelector((state) => state.auth);
  return (
    <nav className=" h-screen w-16 max-w-16  ">
      <div className="fixed z-20 bg-background-50 h-screen">
        <div className="flex flex-col gap-2 w-16  pt-2 pl-2">
          <HomeButton isActive={pathname === "/" ? true : false} />
          <SearchButton
            isActive={pathname.split("/")[1] === "search" ? true : false}
          />
          <ActivityWriteButton
            isActive={pathname.split("/")[2] === "write" ? true : false}
          />
          {user && profile ? (
            <UserButton
              profile={profile}
              isActive={pathname === "/" ? true : false}
            />
          ) : (
            <GoogleLoginButton />
          )}
          <GitIssueButton />
          <SettingsButton />
        </div>
      </div>
    </nav>
  );
};

export const ChapterListSidebar = () => {
  const show = useSelector((state) => state.shows.chapterList.show);
  const style = useSpring({
    to: { width: show ? 250 : 0 },
  });
  return (
    <animated.div style={style} className=" rounded-r-lg overflow-hidden">
      <animated.div
        style={style}
        className="fixed rounded-r-lg overflow-hidden"
      >
        <div className="mb-2">
          <ActivityInfo />
        </div>
        <SideChapterList />
      </animated.div>
    </animated.div>
  );
};

export default SideBar;
