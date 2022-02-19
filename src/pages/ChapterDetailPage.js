import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChapterDetail } from "#comp/activities";
import { useParams, useNavigate } from "react-router-dom";
import { getChapter } from "@/redux/chapters";
import { getActivity } from "@/redux/activities";

export const ChapterDetailPage = () => {
  const { activity_id, chapter_id } = useParams();
  const {
    loading,
    error,
    data: chapter,
  } = useSelector(
    (state) =>
      state.chapters[chapter_id] || {
        data: null,
        loading: false,
        error: null,
      }
  );

  const { data: activity } = useSelector(
    (state) => state.activities.activity[activity_id] || { data: null }
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getChapter(activity_id, chapter_id));
  }, [dispatch, activity_id, chapter_id]);

  useEffect(() => {
    dispatch(getActivity(activity_id));
  }, [dispatch, activity_id]);

  return (
    <>
      {loading && !chapter && <> 로딩중..</>}
      {activity && chapter && (
        <ChapterDetail chapter={chapter} activity={activity} />
      )}
    </>
  );
};

export default ChapterDetailPage;
