import React from "react";
import { ActivityGroup } from "./ActivityGroup";
import { useSelector, useDispatch } from "react-redux";

export const ActivityGroupContainer = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities.activities);
  return <>{activities && <ActivityGroup activities={activities} />}</>;
};

export default ActivityGroupContainer;
