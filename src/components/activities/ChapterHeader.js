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
        <span className="ml-1">{activityTitle}</span>
      </h3>
    </Link>
  );
};

const ChapterFlow = ({ chapters, chapter_id, activity_id }) => {
  return (
    <>
      <div className="grid grid-flow-col gap-8 w-fit max-w-full my-2 justify-center items-center h-5">
        <div
          className="rounded bg-background-200 h-1 w-full"
          style={{
            gridColumn: `${1}/${chapters.length + 1}`,
            gridRow: "1/2",
          }}
        ></div>
        {chapters.map((chapter, index) => {
          const className =
            "rounded-lg transition-all text-center w-5 h-5 " +
            (chapter.chapterid == chapter_id
              ? "bg-background-500 scale-50 hover:scale-100 "
              : "bg-background-300 scale-50 hover:scale-75");
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
                  className="w-4 flex justify-center"
                  tooltipclassname="px-2 whitespace-nowrap w-fit"
                  offsetclass="-top-8 -left-1 after:absolute after:top-7 after:left-2 after:border-transparent after:border-t-background-700"
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
          <div className="pl-2 flex items-center gap-x-4">
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
