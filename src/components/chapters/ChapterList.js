import React from "react";
import { Card, Muted, ToWriteChapterButton } from "#comp/common";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChevronLeftSVG } from "@/icons/SVGs";
import { isArray } from "#serv";

export const ChapterListItem = ({ chapter, index }) => {
  const { activityid, chapterid, subject } = chapter;

  return (
    <Link to={`/activities/${activityid}/chapter/${chapterid}`}>
      <Card.Frame
        className="mb-1 lg:mb-0 p-2 xl:p-2 cursor-pointer flex items-center group"
        expended="true"
      >
        <h4>
          <span className="mr-1 text-text-500 group-hover:text-point-300 transition-all">
            [{`${index + 1}`.padStart(3, "0")}]
          </span>
          {subject}
        </h4>
      </Card.Frame>
    </Link>
  );
};

export const ChapterList = ({ activity, user }) => {
  const {
    id: activity_id,
    author,
    participants,
    chapterid: chapters,
    PW,
  } = activity;

  return (
    <>
      <Card.Frame
        className="bg-background-200 hover:bg-background-200 p-3 xl:p-3 hover:shadow-none min-h-chapterList "
        expended="true"
      >
        <h3 className="m-1 flex gap-2 items-center">
          챕터
          {(PW &&
            isArray(participants) &&
            user &&
            participants.includes(user.email)) ||
            (user && user.email === author && (
              <ToWriteChapterButton activity_id={activity_id} />
            ))}
        </h3>
        <div className="lg:grid gap-x-2 gap-y-1 ">
          {!isArray(chapters) && <Muted>챕터가 없습니다.</Muted>}

          {chapters.map((chapter, index) => {
            return (
              <span key={chapter.chapterid}>
                <ChapterListItem chapter={chapter} index={index} />
              </span>
            );
          })}
        </div>
      </Card.Frame>
    </>
  );
};

const ActivityTitle = ({ activityTitle, activity_id, chapter_id }) => {
  return (
    <Link to={`/activities/${activity_id}`}>
      <h3
        className={
          " ml-2 " +
          (chapter_id
            ? " hover:-translate-x-2 text-point-400 transition-all hover:text-point-600"
            : "text-point-600")
        }
      >
        {chapter_id && (
          <span>
            <ChevronLeftSVG />
          </span>
        )}
        <span className="ml-1">{activityTitle}</span>
      </h3>
    </Link>
  );
};

export const SideChapterListItem = ({ chapter, index, active }) => {
  const { activityid, chapterid, created_time, last, next, subject } = chapter;

  return (
    <Link to={`/activities/${activityid}/chapter/${chapterid}`}>
      <div
        className={
          "mb-1 lg:mb-0 p-2 xl:p-2 cursor-pointer flex  text-text-900 not-italic hover:drop-shadow  group " +
          (active ? "bg-background-100 drop-shadow" : "bg-background-50")
        }
      >
        <div
          className={
            "mr-2 mt-1 rounded-lg transition-all text-center w-4 h-4 z-10  flex-none " +
            (active
              ? "bg-point-600  scale-75 group-hover:scale-90"
              : "bg-background-400  scale-50 group-hover:scale-90")
          }
        ></div>
        <span>
          <span
            className={"mr-1  " + (active ? "text-point-500" : "text-text-500")}
          >
            [{`${index + 1}`.padStart(3, "0")}]
          </span>
          {subject}
        </span>
      </div>
    </Link>
  );
};

export const SideChapterList = React.memo(() => {
  const { activity_id } = useParams();
  const chapter_id = useParams()["*"].split("/")[1];

  const activity = useSelector(
    (state) => state.activities.activity[activity_id]
  );

  return (
    <>
      {activity && (
        <Card.Frame className="bg-background-50 hover:bg-background-50 p-3 xl:p-3 hover:shadow-none min-h-card rounded-none ">
          <ActivityTitle
            activityTitle={activity.title}
            activity_id={activity_id}
            chapter_id={chapter_id}
          />
          <div className="text-sm relative top-0 left-0 my-2">
            {activity.chapterid.length > 0 ? (
              <>
                <div className="w-1 bg-background-300 h-full absolute top-0 left-[13.5px] "></div>
                {activity.chapterid.map((chapter, index) => {
                  return (
                    <span key={chapter.chapterid}>
                      <SideChapterListItem
                        chapter={chapter}
                        index={index}
                        active={chapter.chapterid == chapter_id}
                      />
                    </span>
                  );
                })}
              </>
            ) : (
              <Muted>챕터가 없습니다.</Muted>
            )}
          </div>
        </Card.Frame>
      )}
    </>
  );
});

export default ChapterList;
