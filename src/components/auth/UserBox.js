import React from "react";
import { UserIcon, Muted } from "#comp/common";
import { useSelector, useDispatch } from "react-redux";
import { ContainedActivities } from "#comp/activities";
import { logout } from "@/redux/auth";
import { StreamSVG, SignOutSVG } from "@/icons/SVGs";

const UserProfile = ({ profile }) => {
  const { email, name } = profile;
  return (
    <div className="flex items-center gap-2 max-w-full">
      {/* <UserIcon profile={profile} /> */}
      <div className="overflow-hidden leading-tight ">
        <h4 className="py-0 my-0">{name}</h4>
        <span className="text-text-400 text-sm py-0 my-0 max-w-full break-words h-fit ">
          {email}
        </span>
      </div>
    </div>
  );
};

const LogoutBtnWithText = ({ onLogout }) => {
  return (
    <button onClick={() => onLogout()}>
      <SignOutSVG />
      <Muted>로그아웃</Muted>
    </button>
  );
};

export const UserBox = React.memo(() => {
  const profile = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  if (!profile) return <></>;

  return (
    <div className="h-fit p-1 w-80">
      <div className="ml-14 mt-1">
        <UserProfile profile={profile} />
      </div>
      <hr className="my-1 border-text-300" />
      <div className="px-2">
        <ContainedActivities />
      </div>
      <div className="text-center">
        <StreamSVG />
        <Muted>종료 액티비티 보기</Muted>
      </div>
      <hr className="my-1 border-text-300" />
      <div className="text-right pr-4 pb-1">
        <LogoutBtnWithText onLogout={() => onLogout()} />
      </div>
    </div>
  );
});

export default UserBox;
