import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActivities, getContainedActivities } from "@/redux/activities";
import { ActivityGroup } from "#comp/activities/";
import { UserBox } from "#comp/auth/UserBox";

export const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivities());
    dispatch(getContainedActivities());
  }, [dispatch]);

  const { loading: activitiesLoading, data: activities } = useSelector(
    (state) => state.activities.activities
  );

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: "min-content 1fr min-content" }}
    >
      {activitiesLoading && !activities && "로딩중.."}
      {!activitiesLoading && activities && (
        <>
          <div className="p-2">
            <UserBox />
            <ActivityGroup.ByType activities={activities} type={"Study"} />
          </div>
          <div className="p-2">
            <ActivityGroup.Expended activities={activities} />
          </div>
          <div className="p-2">
            <ActivityGroup.ByType activities={activities} type={"Project"} />
            <ActivityGroup.ByType activities={activities} type={"CTF"} />
          </div>
        </>
      )}
    </div>
  );
};

export default MainPage;
