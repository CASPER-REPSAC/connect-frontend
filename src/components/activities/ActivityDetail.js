import React from "react";
import { Card } from "#comp/common";
import { isArray } from "#serv/helpers";
import { ChapterList } from "./ChapterList";

export const ActivityDetailContent = ({ activity }) => {
  const {
    // url,
    // id,
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
  } = activity;

  const authorData = participants.find(
    (participant) => participant.profile.email === author
  );

  return (
    <>
      <div className="flex-none">
        <span className="text-text-500 text-xs font-bold ">
          Activity | {type}
        </span>
        <h2>{title}</h2>
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

export const ActivityDetail = ({ activity }) => {
  return (
    <>
      <ActivityDetailContent activity={activity} />
    </>
  );
};

export default ActivityDetail;
