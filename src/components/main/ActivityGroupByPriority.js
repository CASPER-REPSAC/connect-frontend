import React from "react";

import { ActivityGroup } from "#comp/activities/";
import { useActivities, useLayouts } from "@/hooks";
import { ToEndedActivityButton } from "#comp/common";

const MainPageGridItem = ({ children }) => {
  return (
    <div className="p-1 flex flex-col ">
      <div className="px-3 py-1 pb-2 flex-1 flex flex-col overflow-hidden rounded bg-background-50">
        {children}
      </div>
    </div>
  );
};

export const ActivityGroupByPriority = () => {
  const { activities } = useActivities();
  const { mainLayout } = useLayouts();
  return (
    <>
      <MainPageGridItem>
        <ActivityGroup
          activities={activities[mainLayout.first]}
          type={mainLayout.first}
        />
      </MainPageGridItem>

      <MainPageGridItem>
        <ActivityGroup
          activities={activities[mainLayout.second]}
          type={mainLayout.second}
        />
        <div className="flex justify-center m-2">
          <ToEndedActivityButton />
        </div>
      </MainPageGridItem>

      <MainPageGridItem>
        <ActivityGroup
          activities={activities[mainLayout.third]}
          type={mainLayout.third}
        />
      </MainPageGridItem>
      <MainPageGridItem>
        <ActivityGroup
          activities={activities[mainLayout.fourth]}
          type={mainLayout.fourth}
        />
      </MainPageGridItem>
      <MainPageGridItem>
        <ActivityGroup
          activities={activities[mainLayout.fifth]}
          type={mainLayout.fifth}
        />
      </MainPageGridItem>
    </>
  );
};

export default ActivityGroupByPriority;
