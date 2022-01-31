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
import { Card } from "#comp/common";

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
  const { data: activities } = useSelector(
    (state) => state.activities.activities
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_activities());
    window.scrollTo(0, 0);
  }, [dispatch]);

  useEffect(() => {
    dispatch(get_activity(activity_id));
    window.scrollTo(0, 0);
  }, [dispatch, activity_id]);

  const types = {
    Study: { type: "Study", lgCol: 1, lgRow: 1, row: 1 },
    Project: { type: "Project", lgCol: 3, lgRow: 1, row: 1 },
    CTF: { type: "CTF", lgCol: 3, lgRow: 2, row: 1 },
  };

  return (
    <div className="grid gap-3 max-w-full w-full min-w-full lg:grid-cols-activityLg grid-cols-activityMd grid-rows-activityDetailMd lg:grid-rows-activityDetailLg">
      {loading && !data && (
        <ActivityRowItem
          element={
            <Card.Frame
              className="min-h-description  min-h-detailCard "
              expended="true"
            >
              로딩중..
            </Card.Frame>
          }
          className="mt-2 col-start-1 col-end-2 lg:col-start-2 lg:col-end-3 row-start-1 row-end-5 justify-self-stretch min-w-full h-fit"
        />
      )}
      {data && (
        <>
          <ActivityRowItem
            element={<ActivityDetail activity={data} loading={loading} />}
            className="mt-2 col-start-1 col-end-2 lg:col-start-2 lg:col-end-3 row-start-1 row-end-5 justify-self-stretch min-w-full h-fit"
          />
          <ActivityRowItem
            element={
              <ActivityInfo participants={data.participants} tags={data.tags} />
            }
            className="mt-2 lg:col-start-3 lg:col-end-4 col-start-2 col-end-3 row-start-1 row-end-2"
          />
        </>
      )}
      {activities && (
        <>
          <ActivityRowItem
            item={types.Study}
            element={
              <ActivityCardList
                activities={activities.filter(
                  (activity) => activity.type === types.Study.type
                )}
              />
            }
            icons="true"
            className="lg:col-start-1 lg:col-end-2 col-start-2 col-end-3 lg:row-start-1 lg:row-end-4 row-start-2 row-end-3"
          />

          <ActivityRowItem
            item={types.Project}
            element={
              <ActivityCardList
                activities={activities.filter(
                  (activity) => activity.type === types.Project.type
                )}
              />
            }
            icons="true"
            className="lg:col-start-3 col-start-2 lg:col-end-4 col-end-3 lg:row-start-2 lg:row-end-3 row-start-3 row-end-4"
          />
          <ActivityRowItem
            item={types.CTF}
            element={
              <ActivityCardList
                activities={activities.filter(
                  (activity) => activity.type === types.CTF.type
                )}
              />
            }
            icons="true"
            className="lg:col-start-3 col-start-2 lg:col-end-4 col-end-3 lg:row-start-3 lg:row-end-4 row-start-4 row-end-5"
          />
        </>
      )}
    </div>
  );
};

export default ActivityDetailPage;
