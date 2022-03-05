import React from "react";
import { CasLogoSVG } from "@/icons/CasLogoSVG";
import { Muted } from "#comp/common";

export function LoginGuide() {
  return <div>LoginGuide</div>;
}

export function NoActivitiesGuide() {
  return (
    <div className="h-full w-full flex justify-center items-center min-h-commentInput">
      <div className="flex ">
        <CasLogoSVG width="30" className="fill-text-400" />
        <Muted>음, 액티비티가 없네요..</Muted>
      </div>
    </div>
  );
}

export function LoadingGuide() {
  return <div>LoadingGuide</div>;
}

export const Guides = {
  Login: LoginGuide,
  Loading: LoadingGuide,
  NoActivities: NoActivitiesGuide,
};

export default Guides;
