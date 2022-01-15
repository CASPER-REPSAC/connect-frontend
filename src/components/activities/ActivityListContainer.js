import React from "react";
import { ActivityList } from "./ActivityList";
import { useSelector, useDispatch } from "react-redux";

export const ActivityListContainer = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities.activities);
  return <>{activities && <ActivityList activities={activities} />}</>;
};

export default ActivityListContainer;
