import React from "react";
import { ActivityCardListItem } from "./ActivityCardListItem";
import { isArray, log } from "#serv/helpers";

export const ActivityCardList = ({ activities, expended }) => {
  const { loading, error, data } = activities;
  if (loading && !data) {
  }
  return (
    <div className="flex flex-wrap flex-col gap-2">
      {isArray(activities) &&
        activities.map((activity) => (
          <ActivityCardListItem
            key={activity.id}
            activity={activity}
            expended={expended}
          />
        ))}
    </div>
  );
};

export default ActivityCardList;
