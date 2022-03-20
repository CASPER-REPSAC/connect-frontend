import React from "react";
import { UserIcon } from "@/icons/";
import { useSelector } from "react-redux";
import { ContainedActivities } from "#comp/activities";

const UserProfile = ({ profile }) => {
  const { email, name } = profile;
  return (
    <div className="flex items-center gap-2 max-w-full">
      <UserIcon profile={profile} />
      <div className="overflow-hidden leading-tight ">
        <h4 className="py-0 my-0">{name}</h4>
        <span className="text-text-400 text-sm py-0 my-0 max-w-full break-words h-fit ">
          {email}
        </span>
      </div>
    </div>
  );
};

export const UserBox = React.memo(() => {
  const profile = useSelector((state) => state.auth.profile);

  if (!profile) return <></>;

  return (
    <div className="h-fit">
      <UserProfile profile={profile} />
      <hr className="my-4 border-text-300" />
      <ContainedActivities />
    </div>
  );
});

export default UserBox;
