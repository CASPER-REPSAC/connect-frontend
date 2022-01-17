import React from "react";
import { Card, Tag } from "#comp/common";
import { log, isArray } from "#serv/helpers";

export const ActivityGroupItem = ({ activity }) => {
  const {
    url,
    id,
    title,
    type,
    author,
    createDate,
    description,
    startDate,
    endDate,
    currentState,
    viewerNum,
    tags,
    participants,
  } = activity;

  const authorData = participants.find(
    (participant) => participant.profile.email === author
  );

  return (
    <>
      <Card.Frame className="max-h-activityCard flex flex-col">
        <div className="flex mb-1">
          <Card.Icon
            tooltip={authorData.user_name}
            userdata={authorData}
            className="flex-none mr-2 text-text-50"
          />
          <div className="truncate flex-auto">
            <Card.Title>{title}</Card.Title>
            <div className="flex align-middle">
              <Card.SubTitle>{type}</Card.SubTitle>
              <div className="text-text-600 text-xs leading-6 ml-2">
                {isArray(participants) && (
                  <> {`현재 참여자 ${participants.length}명`}</>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="truncate">
          {isArray(tags) &&
            tags.map((tag) => <Tag key={tag.tag_id}>{tag.tag_name}</Tag>)}
        </div>
      </Card.Frame>
    </>
  );
};

export default ActivityGroupItem;
