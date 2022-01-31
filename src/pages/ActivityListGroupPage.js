import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_activities } from "@/redux/activities";
import { ActivityCardList, ActivityExpendedList } from "#comp/activities/";
import { PenSVG } from "@/icons";

export const ActivityListGroupPage = () => {
  const types = ["Study", "Project", "CTF"];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_activities());
  }, [dispatch]);
  const { loading, error, data } = useSelector(
    (state) => state.activities.activities
  );

  if (loading) {
    return <div>로딩중..</div>;
  }

  return (
    <div
      className="grid gap-3 max-w-full"
      style={{ gridTemplateColumns: "minmax(0, 100%) 1fr 1fr 1fr" }}
    >
      {data && (
        <div className="justify-self-stretch">
          <h2 className=" font-bold m-1">Recent</h2>
          <ActivityCardList activities={data} expended="true" />
        </div>
      )}
      {data &&
        types.map((type) => {
          console.log(data);
          const sortedActivity = data.filter(
            (activity) => activity.type === type
          );
          return (
            <div className="" key={type}>
              <div className="flex justify-between items-center">
                <h2 className=" font-bold m-1">{type}</h2>
                <div className="flex gap-1">
                  <span className="a-char-button text-xs leading-5 ">
                    <PenSVG />
                  </span>
                  <span className="a-char-button leading-5 text-xl ">+</span>
                </div>
              </div>
              <span key={type}>
                {data && <ActivityCardList activities={sortedActivity} />}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default ActivityListGroupPage;
