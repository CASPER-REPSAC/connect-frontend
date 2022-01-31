import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_activities } from "@/redux/activities";
import { ActivityCardList } from "#comp/activities/";
import { ActivityRowItem } from "#comp/activities";

export const ActivityListGroupPage = () => {
  const types = {
    Study: { type: "Study", lgCol: 1, lgRow: 1, row: 1 },
    Project: { type: "Project", lgCol: 3, lgRow: 1, row: 1 },
    CTF: { type: "CTF", lgCol: 3, lgRow: 2, row: 1 },
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_activities());
  }, [dispatch]);
  const { loading, error, data } = useSelector(
    (state) => state.activities.activities
  );

  if (loading && !data) {
    return <div>로딩중..</div>;
  }

  return (
    <div className="grid gap-3 max-w-full w-full min-w-full lg:grid-cols-activityLg grid-cols-activityMd grid-rows-activityLg ">
      {data && (
        <>
          <ActivityRowItem
            item={types.Study}
            element={
              <ActivityCardList
                activities={data.filter(
                  (activity) => activity.type === types.Study.type
                )}
              />
            }
            icons="true"
            className="lg:col-start-1 lg:col-end-2 col-start-2 col-end-3 row-start-1 lg:row-end-4 row-end-2"
          />
          <ActivityRowItem
            item={{ type: "Recent", lgCol: 2, col: 2, row: 1 }}
            element={<ActivityCardList activities={data} expended="true" />}
            className="col-start-1 col-end-2 lg:col-start-2 lg:col-end-3 row-start-1 row-end-4 justify-self-stretch min-w-full"
          />
          <ActivityRowItem
            item={types.Project}
            element={
              <ActivityCardList
                activities={data.filter(
                  (activity) => activity.type === types.Project.type
                )}
              />
            }
            icons="true"
            className="lg:col-start-3 col-start-2 lg:col-end-4 col-end-3 lg:row-start-1 lg:row-end-2 row-start-2 row-end-3"
          />
          <ActivityRowItem
            item={types.CTF}
            element={
              <ActivityCardList
                activities={data.filter(
                  (activity) => activity.type === types.CTF.type
                )}
              />
            }
            icons="true"
            className="lg:col-start-3 col-start-2 lg:col-end-4 col-end-3 lg:row-start-2 lg:row-end-3 row-start-3 row-end-4"
          />
        </>
      )}
    </div>
  );
};

export default ActivityListGroupPage;
