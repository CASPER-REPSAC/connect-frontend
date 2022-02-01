import React from "react";
import { Card } from "#comp/common";
import { Link } from "react-router-dom";

export const ChapterListItem = ({ chapter, index }) => {
  const { activityid, chapterid, created_time, last, next, subject } = chapter;

  return (
    <Link to={`/activities/${activityid}/chapter/${chapterid}`}>
      <Card.Frame
        className="mb-1 lg:mb-0 p-2 xl:p-2 cursor-pointer flex items-center"
        expended="true"
      >
        <h3>
          <span className="mr-1 text-text-500">
            [{`${index + 1}`.padStart(3, "0")}]
          </span>
          {subject}
        </h3>
      </Card.Frame>
    </Link>
  );
};

export const ChapterList = ({ chapters }) => {
  const rows = Math.ceil(chapters.length / 2);
  return (
    <>
      <Card.Frame
        className="bg-background-200 hover:bg-background-200 p-3 xl:p-3 hover:shadow-none min-h-card "
        expended="true"
      >
        <h3 className="m-1">챕터</h3>
        <div className="lg:grid gap-x-2 gap-y-1 grid-cols-2">
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
