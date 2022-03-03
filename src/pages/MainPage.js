import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getActivities,
  getContainedActivities,
  GET_ACTIVITIES,
} from "@/redux/activities";
import { ActivityGroup } from "#comp/activities/";
import { UserBox } from "#comp/auth/UserBox";
import { Guides } from "#comp/common";

export const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivities());
    dispatch(getContainedActivities());
  }, [dispatch]);

  const activities = useSelector((state) => state.activities.activities);
  const activitiesLoading = useSelector(
    (state) => state.loadings[GET_ACTIVITIES]
  );
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col md:flex-row lg:grid grid-flow-col lg:grid-cols-mainXl px-2">
      {activitiesLoading && !activities && <Guides.LoadingGuide />}
      {activities && (
        <>
          {user && (
            <div className="p-2">
              <UserBox />
            </div>
          )}
          <div className="p-2">
            <ActivityGroup.ByType activities={activities} type={"Study"} />
          </div>
          <div className="p-2 hidden lg:block">
            <ActivityGroup.Expended activities={activities} />
          </div>
          <div className="p-2">
            <ActivityGroup.ByType activities={activities} type={"Project"} />
          </div>
          <div className="p-2">
            <ActivityGroup.ByType activities={activities} type={"CTF"} />
          </div>
        </>
      )}
    </div>
  );
};

export default MainPage;
