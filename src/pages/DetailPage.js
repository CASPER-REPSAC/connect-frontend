import React, { useEffect } from "react";
import { ChapterListSidebar } from "#comp/navigations";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { ActivityDetail } from "#comp/activities";
import { ChapterDetail } from "#comp/chapters";
import { getActivity } from "@/redux/activities";
import { joinActivity, quitActivity } from "@/redux/submits";

import { Routes, Route, useLocation } from "react-router-dom";
import { Card } from "#comp/common";

export const DetailPage = () => {
  const { activity_id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getActivity(activity_id));
  }, [dispatch, activity_id]);

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
  const { user } = useSelector((state) => state.auth);

  const onJoinActivity = () => {
    dispatch(joinActivity(activity_id, user.pk));
  };

  const onQuitActivity = () => {
    dispatch(quitActivity(activity_id, user.pk));
  };

  return (
    <div
      className="grid relative"
      style={{ gridTemplateColumns: "min-content 1fr" }}
    >
      <div className="col-start-1 overflow-hidden w-fit pt-2">
        <ChapterListSidebar />
      </div>
      <div className="col-start-2 p-2  ">
        <Card.Frame
          expended="true"
          className="bg-background-50 hover:bg-background-50 xl:p-6 p-6 hover:shadow-none min-h-card  "
        >
          {activity && (
            <Routes>
              <Route
                path=""
                element={
                  <ActivityDetail
                    activity={activity}
                    user={user}
                    onQuitActivity={onQuitActivity}
                    onJoinActivity={onJoinActivity}
                  />
                }
              />
              <Route
                path="chapter/:chapter_id"
                element={<ChapterDetail activity={activity} />}
              />
            </Routes>
          )}
        </Card.Frame>
      </div>
    </div>
  );
};

export default DetailPage;
