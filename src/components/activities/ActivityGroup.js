import React from "react";
import { ActivityGroupItem } from "./ActivityGroupItem";
import { isArray, log } from "serv/helpers";

export const ActivityGroup = ({ activities }) => {
  const { loading, error, data } = activities;
  return (
    <div className="flex flex-wrap">
      {isArray(data) &&
        data.map((activity) => (
          <ActivityGroupItem key={activity.id} activity={activity} />
        ))}
    </div>
  );
};

export default ActivityGroup;
