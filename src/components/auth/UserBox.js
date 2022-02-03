import React from "react";
import { Card } from "#comp/common";
import { UserIcon } from "@/icons/";

const UserProfile = ({ profile }) => {
  const { email, name, given_name, family_name, picture } = profile;
  console.log(profile);
  return (
    <div className="flex gap-2 items-center">
      <UserIcon userdata={{ profile: profile }} />
      <div>
        <h3 className="py-0 my-0">{name}</h3>
        <span className="text-text-400 text-sm py-0 my-0">{email}</span>
      </div>
    </div>
  );
};

const NoUser = () => {
  return <div className="text-text-500 text-sm">로그인 할 수 있는데...</div>;
};

export const UserBox = ({ profile }) => {
  return (
    <Card.Frame>
      {profile ? <UserProfile profile={profile} /> : <NoUser />}
    </Card.Frame>
  );
};

export default UserBox;
