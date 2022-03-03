import React from "react";
import { sortActivitiesByType } from "#serv";
import { ActivityCardList } from "./ActivityCardList";

export function SortedActivityGroupByType({ activities, type }) {
  return (
    <div>
      <h2>{type}</h2>
      <ActivityCardList activities={sortActivitiesByType(activities, type)} />
    </div>
  );
}

export function ExpendedActivityGroup({ activities, title }) {
  return (
    <div>
      <h2>{title || "Recent"}</h2>
      <ActivityCardList activities={activities} expended={"true"} />
    </div>
  );
}

export const ActivityGroup = {
  ByType: SortedActivityGroupByType,
  Expended: ExpendedActivityGroup,
};

export default ActivityGroup;
