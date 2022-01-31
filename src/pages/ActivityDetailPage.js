import React, { useEffect } from "react";
import { ActivityDetail } from "#comp/activities";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const ActivityDetailPage = () => {
  const { activity_id } = useParams();
  const { data, loading, error } = useSelector(
    (state) =>
      state.activities.activity[activity_id] || {
        loading: false,
        data: null,
        error: null,
      }
  );

  const dispatch = useDispatch();

  return <div>{data && <ActivityDetail activity={data} />}</div>;
};

export default ActivityDetailPage;
