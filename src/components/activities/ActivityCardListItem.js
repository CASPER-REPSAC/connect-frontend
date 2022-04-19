import React from "react";
import { Card, Muted } from "#comp/common";
import { isArray } from "#serv/helpers";
import { useNavigate } from "react-router-dom";
import { activitiesState } from "@/texts";

export const ActivityCardListItem = ({ activity, expended }) => {
  const navigate = useNavigate();
  const { id, title, author, createDate, type, currentState, participants } =
    activity;

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
                "whitespace-normal " +
                (currentState === 2 ? `text-text-600` : "")
              }
            >
              <h4>{title}</h4>
            </Card.Title>
            <div className="flex align-middle justify-between">
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
                  <span className="text-point-400 text-xs whitespace-nowrap">{` 예정`}</span>
                )}
                {currentState !== 2 &&
                  new Date(createDate) > new Date() - 172800000 && (
                    <span className="text-point-500 text-xs ">{` new!`}</span>
                  )}
              </div>
              <div className="text-xs text-text-400 italic">{type}</div>
            </div>
          </div>
        </div>
      </Card.Frame>
    </>
  );
};

export default ActivityCardListItem;
