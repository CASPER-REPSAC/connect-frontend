import React from "react";
import { Card, IconWithToolTip } from "#comp/common";
import { isArray } from "#serv/helpers";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const ParticipantIcons = ({ participants }) => {
  return (
    <>
      {participants && (
        <div className="grid grid-cols-3 max-w-fit xl:grid-cols-5 gap-1">
          {participants.map((participant, index) => {
            return (
              <Link
                key={participant.user_id}
                to={"/search-user/" + participant.profile.email}
              >
                <IconWithToolTip
                  key={participant.user_id}
                  profile={participant.profile}
                  tooltip={(index === 0 ? "๐" : "") + participant.user_name}
                  offsetclass="top-12 left-0 after:absolute after:-top-1/4 after:left-[12px] after:border-transparent after:border-b-background-700"
                  className="w-10 h-10"
                />
              </Link>
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

export const ActivityInfo = React.memo(() => {
  const { activity_id } = useParams();
  const data = useSelector((state) => state.activities.activity[activity_id]);

  return (
    <>
      <Card.Frame className="h-fit hover:shadow-none hover:bg-background-50 rounded-none">
        <h3>์ฐธ์ฌ์</h3>
        {data && (
          <>
            <ParticipantIcons participants={data.participants} />
            <>
              <hr className="my-2 " />
              <h3>ํ๊ทธ</h3>
              {isArray(data.tags) ? (
                <Tags tags={data.tags} />
              ) : (
                <span className="text-sm text-text-500">ํ๊ทธ๊ฐ ์์ต๋๋ค.</span>
              )}
            </>
          </>
        )}
      </Card.Frame>
    </>
  );
});

export default ActivityInfo;
