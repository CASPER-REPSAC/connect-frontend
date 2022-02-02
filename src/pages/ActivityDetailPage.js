import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { ActivityDetail } from "#comp/activities";
import { getActivity } from "@/redux/activities";

export const ActivityDetailPage = () => {
  const { activity_id } = useParams();
  const {
    loading,
    error,
    data: activity,
  } = useSelector(
    (state) =>
      state.activities.activity[activity_id] || {
        data: null,
        loading: false,
        error: null,
      }
  );

  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getActivity(activity_id));
  }, [dispatch, activity_id]);

  return (
    <>
      {loading && !activity && <> 로딩중..</>}
      {activity && <ActivityDetail activity={activity} />}
    </>
  );
};

export default ActivityDetailPage;
