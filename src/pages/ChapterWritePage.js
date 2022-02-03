import React, { useEffect } from "react";
import { ChapterForm } from "#comp/write";
import { Card } from "#comp/common";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeChapterInput } from "@/redux/inputs";
import { submitChapter } from "@/redux/submits";
import { getActivity } from "@/redux/activities";
import { SubmitButton } from "#comp/common";
import {
  ActivityRowItem,
  ActivityInfo,
  SideChapterList,
} from "#comp/activities/";

export const ChapterWritePage = () => {
  const { activity_id } = useParams();
  const dispatch = useDispatch();

  const onChange = (e) => {
    dispatch(changeChapterInput(e.target));
  };

  const onSubmit = () => {
    dispatch(changeChapterInput({ name: "activity_id", value: activity_id }));

    dispatch(submitChapter(activity_id));
  };
  useEffect(() => {
    dispatch(getActivity(activity_id));
  }, [dispatch, activity_id]);

  const chapterInput = useSelector((state) => state.inputs.chapterInput);
  const { data: activity } = useSelector(
    (state) =>
      state.activities.activity[activity_id] || { data: null, PW: null }
  );
  const { email: userEmail } = useSelector(
    (state) => state.auth.user || { email: "" }
  );

  return (
    <div
      className="grid gap-2 mt-2"
      style={{ gridTemplateColumns: "1fr minmax(300px, 100%)" }}
    >
      <ActivityRowItem gridPosition="start_all">
        <div className="flex flex-col gap-2 ">
          <ActivityInfo />
          <SideChapterList />
        </div>
      </ActivityRowItem>

      <Card.Frame
        expended="true"
        className="hover:bg-background-50 hover:shadow-none min-h-detailCard"
      >
        <span className="text-text-500 text-xs font-bold ">
          Write | Chapter
        </span>
        {activity && (
          <>
            <h2>
              <span className="text-text-500 text-xs font-bold ">
                Activity -{" "}
              </span>
              {activity.title}
            </h2>
            <ChapterForm
              onChange={onChange}
              chapterInput={chapterInput}
              onSubmit={onSubmit}
              userEmail={userEmail}
              authorEmail={activity.author || null}
              ispw={activity.PW || null}
            />
          </>
        )}
        <div className="text-right">
          <SubmitButton onClick={onSubmit} />
        </div>
      </Card.Frame>
    </div>
  );
};

export default ChapterWritePage;
