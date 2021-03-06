import React from "react";
import { ActivityCardListItem } from "./ActivityCardListItem";

export const ActivityCardList = ({ activities, pageSize, currentPage }) => {
  return (
    <div className="flex flex-col gap-2 relative">
      {activities.length <= pageSize &&
        activities.map((activity) => (
          <ActivityCardListItem
            key={activity.id}
            activity={activity}
            expended={"true"}
          />
        ))}
      {activities.length > pageSize &&
        activities
          .slice(currentPage * pageSize, (1 + currentPage) * pageSize)
          .map((activity) => (
            <ActivityCardListItem
              key={activity.id}
              activity={activity}
              expended={"true"}
            />
          ))}
    </div>
  );
};

export default ActivityCardList;
