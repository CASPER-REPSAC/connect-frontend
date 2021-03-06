import React from "react";
import { ActivityCardList } from "./ActivityCardList";
import { isArray } from "#serv";
import { Muted, Guides, PageControlButtons } from "#comp/common";
import { activityTitles } from "@/texts";
import { useActivityGroup } from "@/hooks";

export const ActivityGroup = ({ activities, type }) => {
  const { maxPage, currentPage, pageSize, onNextPage, onPreviousPage } =
    useActivityGroup(activities, type);

  const title = activityTitles[type];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="mb-2 mt-1">
            {title}
            {maxPage > 1 && (
              <Muted>
                ({currentPage + 1}/{maxPage})
              </Muted>
            )}
          </h3>
          <div>
            {activities.length > pageSize && (
              <PageControlButtons
                onNextPage={onNextPage}
                onPreviousPage={onPreviousPage}
              />
            )}
          </div>
        </div>
        <div className="h-full">
          {isArray(activities) ? (
            <ActivityCardList
              activities={activities}
              pageSize={pageSize}
              currentPage={currentPage}
            />
          ) : (
            <Guides.NoActivities />
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityCardList;
