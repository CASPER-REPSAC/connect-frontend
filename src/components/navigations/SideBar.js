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

export const SideBar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="pl-2 pt-2 min-h-full max-h-full w-16 max-w-16 z-20">
      <div className="flex flex-col z-20 w-16 gap-2">
        <HomeButton isActive={pathname === "/" ? true : false} />
        <SearchButton
          isActive={pathname.split("/")[1] === "search" ? true : false}
        />
        <ActivityWriteButton
          isActive={pathname.split("/")[2] === "write" ? true : false}
        />
        <GoogleLoginButton />
        <UserButton isActive={pathname === "/" ? true : false} />
        <GitIssueButton />
        <SettingsButton />
      </div>
    </nav>
  );
};

export default SideBar;
