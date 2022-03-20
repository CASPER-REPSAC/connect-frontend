import React from "react";
import { ChapterListItem } from "#comp/chapters/ChapterListItem";
import { ActivityCardListItem } from "./ActivityCardListItem";

export const ActivityChapterList = ({ cards }) => {
  return (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-items-center">
      {cards.map((card) => {
        if (card.description) {
          return (
            <ActivityCardListItem
              expended="true"
              activity={card}
              key={card.id}
            />
          );
        } else {
          return (
            <ChapterListItem
              chapter={card}
              key={card.activityid + card.chapterid}
              expended="true"
            />
          );
        }
      })}
    </div>
  );
};

export default ActivityChapterList;
