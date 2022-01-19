import React from "react";
import {
  SearchIconWithBg,
  SignInIconWithBg,
  KeyboardIconWithBg,
  CogIconWithBg,
  CasLogoIconWithBg,
  GitIssueIconWithBg,
} from "@/icons";

export const SideBar = () => {
  return (
    <nav className="pl-2 pt-2 min-h-full max-h-full w-16 max-w-16">
      <div className="flex flex-col z-10 w-16 gap-2">
        <CasLogoIconWithBg />
        <SearchIconWithBg />
        <GitIssueIconWithBg />
      </div>
    </nav>
  );
};

export default SideBar;
