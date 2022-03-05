import React, { useEffect } from "react";
import { ActivityCardList } from "./ActivityCardList";
import { Card, Muted, Guides } from "#comp/common";
import { isArray } from "#serv";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getContainedActivities,
  GET_CONTAINED_ACTIVITIES,
} from "@/redux/activities";
import { activitiesState } from "@/texts";

const ContainedActivitiesItem = ({ activity, userId }) => {
  const { id, title, currentState, participants } = activity;
  return (
    <Link to={"/activities/" + id}>
      <div
        className={
          "flex justify-between hover:drop-shadow px-3 py-2 gap-2 rounded border border-text-200 " +
          (currentState == 2
            ? "hover:bg-background-200 bg-background-200 text-text-500 "
            : "hover:bg-background-100 ")
        }
      >
        <div>
          <span>{userId === participants[0].user_id && <>👑</>}</span>
          <h4 className="inline">{title}</h4>
        </div>
        <Muted>{currentState == 2 && <>{activitiesState.ended}</>}</Muted>
      </div>
    </Link>
  );
};

export const ContainedActivities = React.memo(() => {
  const dispatch = useDispatch();
  const containedActivities = useSelector(
    (state) => state.activities.containedActivities
  );
  const containedActivitiesLoading = useSelector(
    (state) => state.loadings[GET_CONTAINED_ACTIVITIES]
  );

  const { pk: userpk } = useSelector(
    (state) => state.auth.user || { pk: undefined }
  );

  useEffect(() => {
    if (userpk && !containedActivities) {
      dispatch(getContainedActivities());
    }
  }, [dispatch, userpk, containedActivities]);

  if (!containedActivities || !userpk) return <></>;

  return (
    <>
      <h4>내가 속한 액티비티</h4>
      <div className="flex flex-col mt-1 gap-1">
        {containedActivitiesLoading && !containedActivities && "로딩 중..."}
        {isArray(containedActivities) &&
          containedActivities.map((activities) => (
            <ContainedActivitiesItem
              key={activities.id}
              activity={activities}
              userId={userpk}
            />
          ))}
        {!containedActivitiesLoading && !isArray(containedActivities) && (
          <Guides.NoActivities />
        )}
      </div>
    </>
  );
});

export default ContainedActivities;
