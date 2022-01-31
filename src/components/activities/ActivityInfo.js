import React from "react";
import { Card } from "#comp/common";
import { isArray } from "#serv/helpers";

const ParticipantIcons = ({ participants }) => {
  return (
    <>
      {participants && (
        <div className="grid grid-cols-3 max-w-fit xl:grid-cols-5 gap-1">
          {participants.map((participant, index) => {
            return (
              <Card.Icon
                key={participant.user_id}
                userdata={participant}
                tooltip={(index === 0 ? "👑" : "") + participant.user_name}
                offsetclass="top-12 -left-5 after:absolute after:-top-1/4 after:right-1/2 after:border-transparent after:border-b-background-700"
                className="w-10 h-10"
              />
            );
          })}
        </div>
      )}
    </>
  );
};

const Tags = ({ tags }) => {
  return (
    <div className="flex flex-wrap whitespace-normal text-text-500 text-xs max-w-full">
      {isArray(tags) &&
        tags.map((tag) => (
          <span className="mr-2 flex-none" key={tag.tag_id}>
            #{tag.tag_name}
          </span>
        ))}
    </div>
  );
};

export const ActivityInfo = ({ participants, tags }) => {
  return (
    <>
      <Card.Frame className="h-fit hover:shadow-none hover:bg-background-50">
        <h3>참여자</h3>
        <ParticipantIcons participants={participants} />
        {isArray(tags) && (
          <>
            <hr className="my-2 " />
            <h3>태그</h3>
            <Tags tags={tags} />
          </>
        )}
      </Card.Frame>
    </>
  );
};

export default ActivityInfo;
