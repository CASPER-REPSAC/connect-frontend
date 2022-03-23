import React from "react";
import { Card, Muted, Guides } from "#comp/common";
import { useUser } from "@/hooks/";
import { isArray } from "#serv";
import { ActivityCardList } from "#comp/activities";
import { UserIcon } from "@/icons/";

export const UserPage = () => {
  const {
    getUserInfo,
    userActivities,
    user_email,
    activityCount,
    pageSize,
    currentPage,
    userSearchLoading,
    user_info,
  } = useUser();
  return (
    <div className="p-2 h-full w-full flex justify-center">
      <Card.Frame
        expended="true"
        className="hover:bg-background-50 hover:shadow-none w-full sm:w-[500px] md:w-[650px] lg:w-[900px] p-4"
      >
        <h3 className="flex gap-2 items-center mb-2">
          <UserIcon profile={user_info} />
          <div className="flex flex-col">
            {user_info.name}
            <Muted className="ml-0 leading-3">{user_info.email}</Muted>
          </div>
        </h3>
        {!userSearchLoading ? (
          <>
            <h4>작성 액티비티</h4>
            <ActivityCardList
              activities={userActivities}
              pageSize={pageSize}
              currentPage={currentPage}
            />
          </>
        ) : (
          <Guides.Loading />
        )}
      </Card.Frame>
    </div>
  );
};

export default UserPage;
