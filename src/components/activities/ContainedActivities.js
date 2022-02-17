import React from "react";
import { ActivityCardList } from "./ActivityCardList";
import { Card } from "#comp/common";
import { isArray } from "#serv";
import { Link } from "react-router-dom";

const ContainedActivitiesItem = ({ activity, userId }) => {
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
    authString,
  } = activity;
  return (
    <Link to={"/activities/" + id}>
      <div
        className={
          "flex justify-between hover:drop-shadow px-3 py-2 gap-2 rounded border " +
          (currentState == 2
            ? "hover:bg-background-200 bg-background-200 text-text-500 "
            : "hover:bg-background-100 ")
        }
      >
        <div>
          <span>{userId === participants[0].user_id && <>👑</>}</span>
          <h3 className="inline">{title}</h3>
        </div>
        <span className="font-bold text-xs leading-6 flex-none">
          {currentState == 2 && <>종료됨</>}
        </span>
      </div>
    </Link>
  );
};

export const ContainedActivities = React.memo(({ activities, user }) => {
  return (
    <Card.Frame className="hover:bg-background-50 hover:shadow-none">
      <h3>내가 속한 액티비티</h3>
      <div className="flex flex-col mt-1 gap-1">
        {isArray(activities) &&
          activities.map((activity) => (
            <ContainedActivitiesItem
              key={activity.id}
              activity={activity}
              userId={user.pk}
            />
          ))}
      </div>
    </Card.Frame>
  );
});

export default ContainedActivities;
