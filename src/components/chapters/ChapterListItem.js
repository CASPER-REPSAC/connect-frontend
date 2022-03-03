import React from "react";
import { Card, Muted } from "#comp/common";
import { isArray } from "#serv/helpers";
import { useNavigate } from "react-router-dom";

export const ActivityListItem = ({ activity, expended }) => {
  const navigate = useNavigate();
  const {
    // url,
    id,
    title,
    type,
    author,
    createDate,
    description,
    startDate,
    endDate,
    currentState,
    // viewerNum,
    tags,
    participants,
    // authString,
  } = activity;

  const authorData = participants.find(
    (participant) => participant.profile.email === author
  );

  return (
    <>
      <Card.Frame
        className={
          `h-full cursor-pointer ` +
          (currentState === 2
            ? `h-fit bg-background-300 hover:bg-background-300`
            : `h-fit`)
        }
        expended={expended}
        onClick={() => {
          navigate(`/activities/${id}`);
        }}
      >
        <div className="h-full flex flex-col justify-between">
          <div className="truncate flex-auto">
            <Card.Title
              className={
                currentState === 2
                  ? `whitespace-normal text-text-600`
                  : `whitespace-normal`
              }
            >
              <h3>{title}</h3>
            </Card.Title>
            <div className="md:flex md:align-middle">
              <div className="text-text-400 text-xs whitespace-normal">
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
            </div>
          </div>

          <div className="truncate text-text-500 text-xs">
            {isArray(tags) &&
              tags.map((tag) => (
                <span className="mr-2" key={tag.tag_id}>
                  #{tag.tag_name}
                </span>
              ))}
          </div>
        </div>
      </Card.Frame>
    </>
  );
};

export const ChapterListItem = ({ chapter, expended }) => {
  const navigate = useNavigate();
  const {
    activityid,
    chapterid,
    subject,
    // created_time,
    // modified_time,
    article,
  } = chapter;

  const newArticle = article
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/&nbsp;/gi, " ");

  return (
    <>
      <Card.Frame
        onClick={() => {
          navigate(`/activities/${activityid}/chapter/${chapterid}`);
        }}
        expended={expended}
        className="cursor-pointer h-full"
      >
        <Card.Title className="whitespace-normal">
          <h3>
            {subject}
            <Muted>챕터</Muted>
          </h3>
        </Card.Title>
        <div className=" mb-2 max-h-12 overflow-hidden truncate">
          {newArticle}
        </div>
      </Card.Frame>
    </>
  );
};
