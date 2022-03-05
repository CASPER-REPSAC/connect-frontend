import React, { useState, useEffect } from "react";
import { ActivityCardList } from "./ActivityCardList";
import { isArray, log } from "#serv";
import { CaretRightSVG, CaretLeftSVG } from "@/icons";
import { Muted, Guides } from "#comp/common";
import { activityTitles } from "@/texts";

const PageControlButtons = ({ onPreviousPage, onNextPage }) => {
  return (
    <div className="flex gap-4 text-lg text-text-800">
      <button
        onClick={() => {
          onPreviousPage();
        }}
      >
        <CaretLeftSVG />
      </button>
      <button
        onClick={() => {
          onNextPage();
        }}
      >
        <CaretRightSVG />
      </button>
    </div>
  );
};

export const ActivityGroup = ({ activities, title }) => {
  const [currentPage, setCurrentPage] = useState(0);
  let pageSize = 6;
  if (title === activityTitles.running || title === activityTitles.planned)
    pageSize = 3;
  const maxPage = Math.ceil(activities.length / pageSize);

  useEffect(() => {
    if (maxPage > 0 && currentPage >= maxPage) {
      setCurrentPage(maxPage - 1);
    }
  }, [currentPage, maxPage]);

  useEffect(() => {
    if (currentPage < 0) {
      setCurrentPage(0);
    }
  }, [currentPage]);

  const onNextPage = () => {
    if (activities.length > (currentPage + 1) * pageSize) {
      setCurrentPage(currentPage + 1);
    }
  };
  const onPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <h3>
            {title}
            {maxPage > 2 && (
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
