import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActivityDetail } from "#comp/activities";

export const ChapterDetailPage = () => {
  const { loading, error, data } = useSelector(
    (state) => state.activities.activity
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch();
  }, [dispatch]);
  return <div></div>;
};

export default ChapterDetailPage;
