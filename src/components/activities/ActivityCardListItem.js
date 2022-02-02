import React from "react";
import { Card } from "#comp/common";
import { isArray } from "#serv/helpers";
import { useNavigate } from "react-router-dom";

export const ActivityCardListItem = ({ activity, expended }) => {
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
          `max-w-full` +
          (currentState === 2
            ? `flex flex-col h-fit bg-background-300 hover:bg-background-300 cursor-pointer`
            : `flex flex-col h-fit cursor-pointer`)
        }
        expended={expended || null}
        onClick={() => {
          navigate(`/activities/${id}`);
        }}
      >
        <div className="flex mb-1">
          <div className="truncate flex-auto">
            <Card.Title
              className={
                currentState === 2
                  ? `whitespace-normal text-text-600`
                  : `whitespace-normal`
              }
            >
              {expended ? <h2>{title}</h2> : <h3>{title}</h3>}
            </Card.Title>
            <div className="md:flex md:align-middle">
              <div className="text-text-400 text-xs whitespace-normal">
                {expended && <>{type}</>}
                {expended && (
                  <> {`| ${createDate} | ${startDate}~${endDate} | `}</>
                )}
                {<> {`${authorData.profile.name} +`}</>}
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
                  <span className="text-blue-500 text-xs whitespace-nowrap">{` 예정`}</span>
                )}
                {currentState !== 2 &&
                  new Date(createDate) > new Date() - 172800000 && (
                    <span className="text-red-500 text-xs ">{` new!`}</span>
                  )}
              </div>
            </div>
          </div>
        </div>

        {expended && (
          <>
            <hr className="my-2" />
            <div className=" max-h-96 overflow-y-hidden whitespace-normal break-words text-ellipsis">
              <div
                className={currentState === 2 ? ` text-text-600` : ``}
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </div>
          </>
        )}
        {isArray(tags) && tags.length > 0 && expended && (
          <div className=" mt-8"></div>
        )}

        <div className="truncate text-text-500 text-xs">
          {/* {isArray(tags) &&
            tags.map((tag) => <Tag key={tag.tag_id}>{tag.tag_name}</Tag>)} */}
          {isArray(tags) &&
            tags.map((tag) => (
              <span className="mr-2" key={tag.tag_id}>
                #{tag.tag_name}
              </span>
            ))}
        </div>
      </Card.Frame>
    </>
  );
};

export default ActivityCardListItem;
