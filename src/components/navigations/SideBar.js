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

export const SideBar = () => {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="pl-2 pt-2 h-screen w-16 max-w-16 z-20 bg-background-300  rounded-r-xl">
      <div className="flex flex-col z-20 w-16 gap-2">
        <HomeButton isActive={pathname === "/" ? true : false} />
        <SearchButton
          isActive={pathname.split("/")[1] === "search" ? true : false}
        />
        <ActivityWriteButton
          isActive={pathname.split("/")[2] === "write" ? true : false}
        />
        {user ? (
          <UserButton isActive={pathname === "/" ? true : false} />
        ) : (
          <GoogleLoginButton />
        )}
        <GitIssueButton />
        <SettingsButton />
      </div>
    </nav>
  );
};

export default SideBar;
