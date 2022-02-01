import React, { useEffect } from "react";
import { ChapterDetail, ActivityRowItem, ActivityInfo } from "#comp/activities";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { get_activity, get_chapter } from "@/redux/activities";
import { Card } from "#comp/common";

export const ChapterDetailPage = () => {
  const { activity_id, chapter_id } = useParams();
  const {
    data: activityData,
    loading: activityLoading,
    error: activityError,
  } = useSelector(
    (state) =>
      state.activities.activity[activity_id] || {
        loading: false,
        data: null,
        error: null,
      }
  );

  const { data, loading, error } = useSelector(
    (state) =>
      state.activities.chapter[chapter_id] || {
        loading: false,
        data: null,
        error: null,
      }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!data || !activityData) {
      dispatch(get_activity(activity_id));
      dispatch(get_chapter(activity_id, chapter_id));
    }
  }, [dispatch, activity_id, chapter_id, data, activityData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ActivityRowItem
        element={
          <Card.Frame
            className="hover:shadow-none hover:bg-background-50 h-fit min-h-detailCard"
            expended="true"
          >
            <ChapterDetail chapter={data} loading={loading} />
          </Card.Frame>
        }
        page="detail"
        priority="main"
      />
      {activityData && (
        <ActivityRowItem
          element={
            <ActivityInfo
              participants={activityData.participants}
              tags={activityData.tags}
            />
          }
          page="detail"
          priority="info"
        />
      )}
    </>
  );
};

export default ChapterDetailPage;
