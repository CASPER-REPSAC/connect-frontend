import React from "react";
import { CasLogoSVG } from "@/icons/CasLogoSVG";
import { Muted } from "#comp/common";
import { GoogleLoginTextButton } from "#comp/auth/GoogleButton";

export function LoginGuide({ msg }) {
  return (
    <div className="h-full w-full flex justify-center items-center min-h-commentInput">
      <div className="flex flex-col gap-3 items-center">
        <div className="flex">
          <CasLogoSVG width="30" className="fill-text-400" />
          <Muted>{msg || "로그인 하면 글을 작성할 수 있어요!"}</Muted>
        </div>
        <div>
          <GoogleLoginTextButton />
        </div>
      </div>
    </div>
  );
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
  return (
    <div className="h-full w-full flex justify-center items-center min-h-commentInput">
      <div className="flex ">
        <CasLogoSVG width="30" className="fill-text-400" />
        <Muted>로딩 중..</Muted>
      </div>
    </div>
  );
}

export const Guides = {
  Login: LoginGuide,
  Loading: LoadingGuide,
  NoActivities: NoActivitiesGuide,
};

export default Guides;
