import React, { useEffect } from "react";
import { ActivityCardList } from "./ActivityCardList";
import { Card, Muted } from "#comp/common";
import { isArray } from "#serv";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getContainedActivities } from "@/redux/activities";

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
        <Muted>{currentState == 2 && <>종료</>}</Muted>
      </div>
    </Link>
  );
};

export const ContainedActivities = React.memo(() => {
  const dispatch = useDispatch();
  const { data: containedActivities, loading: containedActivitiesLoading } =
    useSelector(
      (state) =>
        state.activities.containedActivities || { data: null, loadng: null }
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
      <h3>내가 속한 액티비티</h3>
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
        {!containedActivitiesLoading && !containedActivities && (
          <Muted>속한 액티비티가 없습니다.</Muted>
        )}
      </div>
    </>
  );
});

export default ContainedActivities;
