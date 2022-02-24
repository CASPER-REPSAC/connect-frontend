import React from "react";
import {
  WithToolTip,
  JoinActivityButton,
  QuitActivityButton,
  ToActivityManageButton,
} from "#comp/common";
import { CogSVG, SquarePlusSVG } from "@/icons";
import { isArray } from "#serv/helpers";
import { ChapterList } from "#comp/chapters";
import { Link, useNavigate } from "react-router-dom";

const ActivityStateInfo = ({ activityStateData, authorData }) => {
  const { createDate, startDate, endDate, currentState, participants } =
    activityStateData;
  return (
    <div className="text-text-400 text-xs whitespace-normal">
      {`${createDate} | ${startDate}~${endDate} | `}
      {authorData && <> {`${authorData.profile.name} +`}</>}
      {isArray(participants) && (
        <span className="whitespace-pre">{`${participants.length - 1}`}</span>
      )}
      {currentState === 2 && (
        <span className="text-text-500 text-xs font-bold ">{` 종료됨`}</span>
      )}
      {currentState === 0 && (
        <span className="text-point-800 text-xs whitespace-nowrap">{` 예정`}</span>
      )}
      {currentState !== 2 && new Date(createDate) > new Date() - 172800000 && (
        <span className="text-point-500 text-xs ">{` new!`}</span>
      )}
    </div>
  );
};

const ActivityHeaderButtons = ({
  activityData,
  user,
  onQuitActivity,
  onJoinActivity,
}) => {
  const { id: activity_id, author, participants } = activityData;

  const navigate = useNavigate();
  return (
    <span className="flex gap-2">
      {user && user.email === author ? (
        <ToActivityManageButton
          onClick={() => {
            navigate(`/update/${activity_id}`);
          }}
        />
      ) : (
        <>
          {participants.find(
            (participant) => participant.user_id === user?.pk
          ) ? (
            <QuitActivityButton
              onClick={() => {
                onQuitActivity();
              }}
            />
          ) : (
            <JoinActivityButton
              onClick={() => {
                onJoinActivity();
              }}
            />
          )}
        </>
      )}
    </span>
  );
};

export const ActivityDetailContent = ({
  activity,
  user,
  onQuitActivity,
  onJoinActivity,
}) => {
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
    <div className="flex flex-col gap-20">
      <div className="flex-none">
        <span className="text-text-500 text-xs font-bold">
          Activity | {type}
        </span>

        <h1>{title}</h1>
        <div className="flex justify-between items-center ">
          <ActivityStateInfo
            activityStateData={{
              createDate,
              endDate,
              startDate,
              currentState,
              participants,
            }}
            authorData={authorData}
          />
          <ActivityHeaderButtons
            activityData={{ author, id: activity_id, participants }}
            user={user}
            onQuitActivity={onQuitActivity}
            onJoinActivity={onJoinActivity}
          />
        </div>
        <hr className=" mt-2 mb-4" />
        <div className="whitespace-normal break-words flex-none">
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
      </div>

      <div className="flex-none">
        <ChapterList
          activity={{ id: activity_id, author, participants, chapterid, PW }}
          user={user}
        />
      </div>
    </div>
  );
};

export const ActivityDetail = ({
  activity,
  user,
  onJoinActivity,
  onQuitActivity,
}) => {
  return (
    <>
      {activity && (
        <ActivityDetailContent
          activity={activity}
          user={user}
          onQuitActivity={onQuitActivity}
          onJoinActivity={onJoinActivity}
        />
      )}
    </>
  );
};

export default ActivityDetail;
