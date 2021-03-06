import React from "react";
import { Card, Muted, Guides, UserIcon } from "#comp/common";
import { useUser, useAuthUser } from "@/hooks/";
import { ActivityCardList, ContainedActivities } from "#comp/activities";

export const UserPage = () => {
  const {
    // getUserInfo,
    userActivities,
    user_email,
    // activityCount,
    pageSize,
    currentPage,
    userSearchLoading,
    user_info,
    wai,
  } = useUser();

  const { user: authUser } = useAuthUser();

  return (
    <div className="p-2 h-full w-full flex justify-center">
      <Card.Frame
        expended="true"
        className="hover:bg-background-50 hover:shadow-none w-full sm:w-[500px] md:w-[650px] lg:w-[900px] p-4"
      >
        {!wai && (
          <Guides.Login msg="로그인을 하면 유저페이지를 볼 수 있어요." />
        )}
        {user_info && (
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="flex gap-2 items-center">
                <UserIcon profile={user_info} />
                <div className="flex flex-col">
                  {user_info.name}
                  <Muted className="ml-0 leading-3">{user_info.email}</Muted>
                </div>
              </h3>
            </div>

            {authUser.email === user_email && (
              <div>
                <ContainedActivities />
              </div>
            )}

            {!userSearchLoading ? (
              <div>
                <h4>작성 액티비티</h4>
                <ActivityCardList
                  activities={userActivities}
                  pageSize={pageSize}
                  currentPage={currentPage}
                />
              </div>
            ) : (
              <Guides.Loading />
            )}
          </div>
        )}
      </Card.Frame>
    </div>
  );
};

export default UserPage;
