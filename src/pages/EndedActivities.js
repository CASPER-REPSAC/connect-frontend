import React from "react";
import { Card, Muted } from "#comp/common";
import { useEndedActivities } from "@/hooks";
import { ActivityCardList } from "#comp/activities/";
import { CaretRightSVG, CaretLeftSVG } from "@/icons";

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

const EndedActivities = () => {
  const {
    endedActivities,
    maxPage,
    currentPage,
    pageSize,
    onNextPage,
    onPreviousPage,
  } = useEndedActivities();

  return (
    <div className="p-2 h-full w-full flex justify-center">
      <Card.Frame
        expended="true"
        className="hover:bg-background-50 hover:shadow-none w-full sm:w-[500px] md:w-[650px] lg:w-[900px]"
      >
        <h3>
          종료된 액티비티
          <Muted className="ml-1"> ({endedActivities.length})</Muted>
        </h3>
        <div>
          {endedActivities.length > pageSize && (
            <PageControlButtons
              onNextPage={onNextPage}
              onPreviousPage={onPreviousPage}
            />
          )}
        </div>
        <ActivityCardList
          activities={endedActivities}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </Card.Frame>
    </div>
  );
};

export default EndedActivities;
