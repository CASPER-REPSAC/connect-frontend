import React from "react";
import { PenButton, PlusButton, CogButton, WithToolTip } from "#comp/common";
import { isArray } from "#serv/helpers";
import { ChapterList } from "./ChapterList";
import { Link } from "react-router-dom";

export const ActivityDetailContent = ({ activity, user }) => {
  const {
    // url,
    id: activity_id,
    title,
    type,
    author,
    createDate,
    description,
    startDate,
    endDate,
    currentState,
    // viewerNum,
    // tags,
    participants,
    chapterid,
    PW,
  } = activity;

  const authorData = participants.find(
    (participant) => participant.profile.email === author
  );

  return (
    <>
      <div className="flex-none">
        <span className="text-text-500 text-xs font-bold">
          Activity | {type}
        </span>

        <h2>{title}</h2>
        <div className="flex justify-between items-center ">
          <div className="text-text-400 text-xs whitespace-normal">
            {`${createDate} | ${startDate}~${endDate} | `}
            {authorData && <> {`${authorData.profile.name} +`}</>}
            {isArray(participants) && (
              <span className="whitespace-pre">
                {`${participants.length - 1}`}
              </span>
            )}
            {currentState === 2 && (
              <span className="text-text-500 text-xs font-bold ">
                {` 종료됨`}
              </span>
            )}
            {currentState === 0 && (
              <span className="text-point-800 text-xs whitespace-nowrap">{` 예정`}</span>
            )}
            {currentState !== 2 &&
              new Date(createDate) > new Date() - 172800000 && (
                <span className="text-point-500 text-xs ">{` new!`}</span>
              )}
          </div>
          <span className="flex gap-1">
            <WithToolTip
              tooltip="액티비티 참가"
              tooltipclassname="px-2 whitespace-nowrap w-fit"
              offsetclass="-top-9 -left-1 after:absolute after:top-7 after:left-2 after:border-transparent after:border-t-background-700"
            >
              <PlusButton />
            </WithToolTip>

            {(PW &&
              isArray(participants) &&
              user &&
              participants.includes(user.email)) ||
              (user && user.email === author && (
                <Link to={"/write/activities/" + activity_id}>
                  <WithToolTip
                    tooltip="챕터 작성"
                    tooltipclassname="px-2 whitespace-nowrap w-fit"
                    offsetclass="-top-9 -left-1 after:absolute after:top-7 after:left-2 after:border-transparent after:border-t-background-700"
                  >
                    <PenButton />
                  </WithToolTip>
                </Link>
              ))}
            {user && user.email === author && (
              <WithToolTip
                tooltip="관리"
                tooltipclassname="px-2 whitespace-nowrap w-fit"
                offsetclass="-top-9 -left-1 after:absolute after:top-7 after:left-2 after:border-transparent after:border-t-background-700"
              >
                <CogButton />
              </WithToolTip>
            )}
          </span>
        </div>
        <hr className=" mt-2 mb-4" />
        <div className="whitespace-normal break-words flex-none">
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
      </div>

      {isArray(chapterid) && (
        <div className="flex-none">
          <ChapterList chapters={chapterid} />
        </div>
      )}
    </>
  );
};

export const ActivityDetail = ({ activity, user }) => {
  return (
    <>
      <ActivityDetailContent activity={activity} user={user} />
    </>
  );
};

export default ActivityDetail;
