import React from "react";
import { Card, Muted, Guides } from "#comp/common";
import { useUser } from "@/hooks/";
import { isArray } from "#serv";
import { ActivityCardList } from "#comp/activities";

export const UserPage = () => {
  const {
    getUserInfo,
    userActivities,
    user_email,
    activityCount,
    pageSize,
    currentPage,
    userSearchLoading,
  } = useUser();
  return (
    <div className="p-2 h-full w-full flex justify-center">
      <Card.Frame
        expended="true"
        className="hover:bg-background-50 hover:shadow-none w-full sm:w-[500px] md:w-[650px] lg:w-[900px]"
      >
        <h3>{user_email}</h3>
        {!userSearchLoading ? (
          <>
            <h4>
              님이 작성한 액티비티<Muted>({activityCount})</Muted>
            </h4>
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
