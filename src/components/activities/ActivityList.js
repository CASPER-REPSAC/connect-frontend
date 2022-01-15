import React from "react";
import { ActivityListItem } from "./ActivityListItem";
import { isArray, log } from "serv/helpers";

export const ActivityList = ({ activities }) => {
  const { loading, error, data } = activities;
  return (
    <div className="flex flex-wrap">
      {isArray(data) &&
        data.map((activity) => (
          <ActivityListItem key={activity.id} activity={activity} />
        ))}
    </div>
  );
};

export default ActivityList;
