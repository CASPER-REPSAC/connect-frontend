import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActivities, getContainedActivities } from "@/redux/activities";
import {
  ActivityCardList,
  ActivityRowItem,
  ActivityInfo,
  SideChapterList,
  ContainedActivities,
} from "#comp/activities/";
import { DetailPage } from "./DetailPage";
import { Routes, Route, useLocation } from "react-router-dom";
import { UserBox } from "#comp/auth/UserBox";

export const MainPage = () => {
  const dispatch = useDispatch();
  const location =
    useLocation().pathname.split("/")[1] === "activities" ? "detail" : "home";

  const { user, profile } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getContainedActivities());
    }
  }, [dispatch, user]);

  const { loading, data } = useSelector((state) => state.activities.activities);
  const { data: containedActivities } = useSelector(
    (state) => state.activities.containedActivities || { data: null }
  );

  if (loading && !data) {
    return <div>로딩중..</div>;
  }

  //  (location === "home"
  //           ? "grid gap-3 max-w-full w-full min-w-full lg:grid-cols-activityLg grid-cols-activityMd grid-rows-activityLg "
  //           : "grid gap-3 max-w-full w-full min-w-full lg:grid-cols-activityLg grid-cols-activityMd grid-rows-activityDetailLg ")

  return (
    <>
      <div
        className={
          "mt-2 " +
          (location === "home"
            ? "grid gap-3 max-w-full w-full min-w-full grid-cols-activityLg grid-rows-activityLg"
            : "grid gap-3 max-w-full w-full min-w-full grid-cols-activityLg grid-rows-activityDetailLg ")
        }
      >
        {data && (
          <>
            <ActivityRowItem gridPosition="main">
              <Routes>
                <Route path="/activities/*" element={<DetailPage />} />

                <Route
                  path="*"
                  element={
                    <ActivityCardList activities={data} expended="true" />
                  }
                />
              </Routes>
            </ActivityRowItem>

            <Routes>
              <Route
                path="/activities/:activity_id"
                element={
                  <ActivityRowItem gridPosition="start_all">
                    <div className="flex flex-col gap-2">
                      <ActivityInfo />
                      <SideChapterList />
                    </div>
                  </ActivityRowItem>
                }
              />
              <Route
                path="/activities/:activity_id/chapter/:chapter_id"
                element={
                  <ActivityRowItem gridPosition="start_all">
                    <div className="flex flex-col gap-2 ">
                      <ActivityInfo />
                      <SideChapterList />
                    </div>
                  </ActivityRowItem>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <ActivityRowItem gridPosition="start_all">
                      <div className="flex flex-col gap-2 ">
                        <UserBox profile={profile} />
                        {user && containedActivities && (
                          <ContainedActivities
                            activities={containedActivities}
                            user={user}
                          />
                        )}
                      </div>
                    </ActivityRowItem>
                  </>
                }
              />
            </Routes>

            <ActivityRowItem
              type={"Study"}
              activities={data}
              icons="true"
              gridPosition="end_first"
            />

            <ActivityRowItem
              type={"Project"}
              activities={data}
              icons="true"
              gridPosition="end_second"
            />
            <ActivityRowItem
              type={"CTF"}
              activities={data}
              icons="true"
              gridPosition="end_third"
            />
          </>
        )}
      </div>
    </>
  );
};

export default MainPage;
