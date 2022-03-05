import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ActivityGroup } from "#comp/activities/";
import { UserBox } from "#comp/auth/UserBox";
import { Guides } from "#comp/common";
import { useActivities } from "@/hooks";
import { activityTitles } from "@/texts";

const MainPageGridItem = ({ children }) => {
  return (
    <div className="p-1 flex flex-col ">
      <div className="px-3 py-1 pb-2 flex-1 flex flex-col overflow-hidden rounded bg-background-50">
        {children}
      </div>
    </div>
  );
};

export const MainPage = () => {
  const user = useSelector((state) => state.auth.user);
  const { activities, activitiesLoading } = useActivities();

  return (
    <div
      className="grid p-1 h-full "
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      }}
    >
      {activitiesLoading && !activities && <Guides.LoadingGuide />}
      {activities && activities.Study && activities.CTF && activities.Project && (
        <>
          {user && (
            <MainPageGridItem>
              <div className="pt-2">
                <UserBox />
              </div>
            </MainPageGridItem>
          )}
          <MainPageGridItem>
            <div className="flex flex-col h-full">
              <div className="pb-3 flex-1">
                <ActivityGroup
                  activities={activities.running}
                  title={activityTitles.running}
                />
              </div>
              <div className="flex-1">
                <ActivityGroup
                  activities={activities.planned}
                  title={activityTitles.planned}
                />
              </div>
            </div>
          </MainPageGridItem>

          <MainPageGridItem>
            <ActivityGroup
              activities={activities.Study}
              title={activityTitles.study}
            />
          </MainPageGridItem>

          <MainPageGridItem>
            <ActivityGroup
              activities={activities.Project}
              title={activityTitles.project}
            />
          </MainPageGridItem>

          <MainPageGridItem>
            <ActivityGroup
              activities={activities.CTF}
              title={activityTitles.CTF}
            />
          </MainPageGridItem>
        </>
      )}
    </div>
  );
};

export default MainPage;
