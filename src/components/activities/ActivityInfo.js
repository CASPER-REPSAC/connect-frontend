import React from "react";
import { Card } from "#comp/common";
import { isArray } from "#serv/helpers";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

export const ActivityInfo = () => {
  const { activity_id } = useParams();
  const { data } = useSelector(
    (state) =>
      state.activities.activity[activity_id] || {
        data: null,
      }
  );

  return (
    <>
      <Card.Frame className="h-fit hover:shadow-none hover:bg-background-50">
        <h3>참여자</h3>
        {data && (
          <>
            <ParticipantIcons participants={data.participants} />
            {isArray(data.tags) && (
              <>
                <hr className="my-2 " />
                <h3>태그</h3>
                <Tags tags={data.tags} />
              </>
            )}
          </>
        )}
      </Card.Frame>
    </>
  );
};

export default ActivityInfo;
