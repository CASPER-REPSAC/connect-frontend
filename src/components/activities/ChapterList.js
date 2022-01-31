import React from "react";
import { Card } from "#comp/common";

export const ChapterListItem = ({ chapter, index }) => {
  const { activityid, chapterid, created_time, last, next, subject } = chapter;

  return (
    <Card.Frame
      className="mb-1 md:mb-0 p-2 cursor-pointer flex items-center"
      expended="true"
    >
      <h3>
        <span className="mr-1 text-text-600">
          [{`${index + 1}`.padStart(3, "0")}]
        </span>
        {subject}
      </h3>
    </Card.Frame>
  );
};

export const ChapterList = ({ chapters }) => {
  const rows = Math.ceil(chapters.length / 2);
  return (
    <>
      <Card.Frame
        className="bg-background-200 hover:bg-background-200 p-2 hover:shadow-none min-h-card "
        expended="true"
      >
        <h3 className="m-1">챕터</h3>
        <div
          className={`lg:grid gap-x-3 gap-y-1 grid-cols-2 grid-rows-[repeat(${rows},_minmax(0,_1fr))]`}
        >
          {chapters.map((chapter, index) => {
            let order = 1;
            if (rows > index) {
              order = 1 + index * 2;
            } else {
              order = (index - rows) * 2 + 2;
            }
            const style = { order: `${order}` };
            return (
              <span key={chapter.chapterid} style={style}>
                <ChapterListItem chapter={chapter} index={index} />
              </span>
            );
          })}
        </div>
      </Card.Frame>
    </>
  );
};

export default ChapterList;
