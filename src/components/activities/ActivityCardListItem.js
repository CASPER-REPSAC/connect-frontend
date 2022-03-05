import React from "react";
import { Card } from "#comp/common";
import { isArray } from "#serv/helpers";
import { useNavigate } from "react-router-dom";
import { activitiesState } from "@/texts";

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
          ` h-full cursor-pointer border border-text-200 ` +
          (currentState === 2
            ? ` bg-background-200 hover:bg-background-300`
            : "")
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
              <h4>{title}</h4>
            </Card.Title>
            <div className="md:flex md:align-middle">
              <div className="text-text-800 text-xs whitespace-normal">
                {authorData && <> {`${authorData.profile.name} +`}</>}
                {isArray(participants) && (
                  <span className="whitespace-pre">
                    {` ${participants.length - 1}`}
                  </span>
                )}
                {currentState === 2 && (
                  <span className="text-text-500 text-xs font-bold ml-2 ">
                    {activitiesState.ended}
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

          {/* <div className="truncate text-text-500 text-xs mt-2">
            {isArray(tags) &&
              tags.map((tag) => (
                <span className="mr-2" key={tag.tag_id}>
                  #{tag.tag_name}
                </span>
              ))}
          </div> */}
        </div>
      </Card.Frame>
    </>
  );
};

export default ActivityCardListItem;
