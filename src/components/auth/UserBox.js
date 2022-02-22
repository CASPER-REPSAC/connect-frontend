import React from "react";
import { Card } from "#comp/common";
import { UserIcon } from "@/icons/";
import { useSelector } from "react-redux";
import { ContainedActivities } from "#comp/activities";

const UserProfile = ({ profile }) => {
  const { email, name, given_name, family_name, picture } = profile;
  console.log(profile);
  return (
    <div className="flex items-center gap-2 max-w-full">
      <UserIcon userdata={{ profile: profile }} />
      <div className="overflow-hidden leading-tight ">
        <h3 className="py-0 my-0">{name}</h3>
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
    <Card.Frame>
      <UserProfile profile={profile} />
      <hr className="my-4" />
      <ContainedActivities />
    </Card.Frame>
  );
});

export default UserBox;
