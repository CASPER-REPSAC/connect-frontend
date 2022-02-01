import React, { useEffect } from "react";
import {
  ActivityDetail,
  ActivityRowItem,
  ActivityCardList,
  ActivityInfo,
} from "#comp/activities";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { get_activity, get_activities } from "@/redux/activities";

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
  useEffect(() => {
    dispatch(get_activity(activity_id));
    dispatch(get_activities());
    window.scrollTo(0, 0);
  }, [dispatch, activity_id]);

  const types = {
    Study: { type: "Study", lgCol: 1, lgRow: 1, row: 1 },
    Project: { type: "Project", lgCol: 3, lgRow: 1, row: 1 },
    CTF: { type: "CTF", lgCol: 3, lgRow: 2, row: 1 },
  };

  if (loading && !data) {
    return <div>로딩중..</div>;
  }

  return (
    <>
      {data && (
        <>
          <ActivityRowItem
            element={<ActivityDetail activity={data} />}
            page="detail"
            priority="main"
          />

          <ActivityRowItem
            element={
              <ActivityInfo participants={data.participants} tags={data.tags} />
            }
            page="detail"
            priority="info"
          />
        </>
      )}
    </>
  );
};

export default ActivityDetailPage;
