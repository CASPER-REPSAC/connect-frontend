import React, { useEffect } from "react";
import { ActivityGroup } from "./ActivityGroup";
import { useSelector, useDispatch } from "react-redux";
import { get_activities } from "@/redux/activities";

export const ActivityGroupContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_activities());
  }, [dispatch]);
  const activities = useSelector((state) => state.activities.activities);
  return <>{activities && <ActivityGroup activities={activities} />}</>;
};

export default ActivityGroupContainer;
