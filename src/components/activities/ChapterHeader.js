import React, { useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { ChevronLeftSVG } from "@/icons";
import { isArray } from "#serv/helpers";
import { useSelector, useDispatch } from "react-redux";
import { get_activity, get_chapter } from "@/redux/activities";
import { WithToolTip } from "#comp/common/ToolTip";

const ActivityTitle = ({ activityTitle, activity_id }) => {
  return (
    <Link to={`/activities/${activity_id}`}>
      <h3 className="text-text-400 hover:-translate-x-2 transition-all hover:text-text-600 cursor-pointer">
        <span>
          <ChevronLeftSVG />
        </span>
        <span className="ml-2">{activityTitle}</span>
      </h3>
    </Link>
  );
};

const ChapterFlow = ({ chapters, chapter_id, activity_id }) => {
  return (
    <>
      <div className="grid grid-flow-col gap-10 max-w-fit my-2 justify-center items-center h-5">
        <div
          className="rounded bg-background-300 h-1 w-full"
          style={{
            gridColumn: `${1}/${chapters.length + 1}`,
            gridRow: "1/2",
          }}
        ></div>
        {chapters.map((chapter, index) => {
          const className =
            "rounded-lg transition-all text-center hover:-translate-x-0.5 " +
            (chapter.chapterid == chapter_id
              ? "w-3 h-3 hover:w-4 hover:h-4 border-2 border-background-400 bg-background-600  "
              : "w-2 h-2 bg-background-400 hover:w-3 hover:h-3 ");
          return (
            <div
              key={chapter.chapterid}
              className="z-10 "
              style={{
                gridColumn: `${index + 1}/${index + 2}`,
                gridRow: "1/2",
              }}
            >
              <Link
                to={`/activities/${activity_id}/chapter/${chapter.chapterid}`}
              >
                <WithToolTip
                  tooltip={chapter.subject}
                  tooltipclassname="px-2 whitespace-nowrap w-fit"
                  offsetclass="top-10 -left-14 after:absolute after:-top-1/4 after:right-1/2  after:border-transparent after:border-b-background-700"
                >
                  <div className={className}></div>
                </WithToolTip>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export const ChapterHeader = () => {
  const { activity_id, chapter_id } = useParams();
  const { data: activity } = useSelector(
    (state) =>
      state.activities.activity[activity_id] || {
        loading: false,
        data: null,
        error: null,
      }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!activity) {
      dispatch(get_activity(activity_id));
    }
  }, [dispatch, activity_id, chapter_id, activity]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {activity && (
        <>
          <div className="m-2">
            <ActivityTitle
              activityTitle={activity.title}
              activity_id={activity_id}
            />
            {isArray(activity.chapterid) && activity.chapterid.length > 1 && (
              <ChapterFlow
                chapters={activity.chapterid}
                chapter_id={chapter_id}
                activity_id={activity_id}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ChapterHeader;
