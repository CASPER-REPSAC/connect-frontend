import React from "react";

import { ActivityGroup } from "#comp/activities/";
import { useActivities, useLayouts } from "@/hooks";

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
      </MainPageGridItem>

      <MainPageGridItem>
        <ActivityGroup
          activities={activities[mainLayout.third]}
          type={mainLayout.third}
        />
      </MainPageGridItem>
      <MainPageGridItem>
        <div className="flex flex-col h-full">
          <div className="pb-3 flex-1">
            <ActivityGroup
              activities={activities[mainLayout.fourth]}
              type={mainLayout.fourth}
            />
          </div>
          <div className="flex-1">
            <ActivityGroup
              activities={activities[mainLayout.fifth]}
              type={mainLayout.fifth}
            />
          </div>
        </div>
      </MainPageGridItem>
    </>
  );
};

export default ActivityGroupByPriority;
