import React from "react";
import { useSelector } from "react-redux";

import { UserBox } from "#comp/auth/UserBox";
import { Guides } from "#comp/common";
import { useActivities, useGetActivities } from "@/hooks";
import { ActivityGroupByPriority } from "#comp/main/";

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
  useGetActivities();

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
          <ActivityGroupByPriority />
        </>
      )}
    </div>
  );
};

export default MainPage;
