import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_activities } from "@/redux/activities";
import { ActivityCardList, ActivityRowItem } from "#comp/activities/";
import {} from "#comp/activities";
import { Routes, Route, useLocation } from "react-router-dom";
import { ActivityDetailPage, ChapterDetailPage } from "@/pages";

export const MainPage = () => {
  const dispatch = useDispatch();
  const location =
    useLocation().pathname.split("/")[1] === "activiteis" ? "detail" : "home";
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
    <div
      className={
        location === "home"
          ? "grid gap-3 max-w-full w-full min-w-full lg:grid-cols-activityLg grid-cols-activityMd grid-rows-activityLg "
          : "grid gap-3 max-w-full w-full min-w-full lg:grid-cols-activityLg grid-cols-activityMd grid-rows-activityDetailLg "
      }
    >
      {data && (
        <>
          <Routes>
            <Route path="/activities/:activity_id">
              <Route path="" element={<ActivityDetailPage />} />
              <Route
                path="chapter/:chapter_id"
                element={<ChapterDetailPage />}
              />
            </Route>

            <Route
              path="*"
              element={
                <ActivityRowItem
                  type="Recent"
                  element={
                    <ActivityCardList activities={data} expended="true" />
                  }
                  page={location}
                  priority="main"
                />
              }
            />
          </Routes>

          <ActivityRowItem
            type={"Study"}
            activities={data}
            page={location}
            icons="true"
            priority="first"
          />

          <ActivityRowItem
            type={"Project"}
            activities={data}
            page={location}
            icons="true"
            priority="second"
          />
          <ActivityRowItem
            type={"CTF"}
            activities={data}
            page={location}
            icons="true"
            priority="third"
          />
        </>
      )}
    </div>
  );
};

export default MainPage;
