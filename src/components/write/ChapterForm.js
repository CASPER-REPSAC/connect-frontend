import React, { useEffect, useCallback } from "react";
import { ClassicCKEditor } from "./ClassicCKEditor";
import {
  changeChapterInput,
  changeChapterInputFiles,
  removeChapterInputFiles,
} from "@/redux/inputs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getActivity } from "@/redux/activities";
import { Guides } from "#comp/common";

const SubjectInput = ({ subject, onChange }) => {
  return (
    <label
      htmlFor="subject"
      className="col-start-1 col-end-[-1] row-start-1 row-end-2 items-stretch"
    >
      <input
        type="text"
        id="subject"
        name="subject"
        value={subject || ""}
        className="connect-input w-full pl-1"
        onChange={(e) => {
          onChange(e);
        }}
      />
    </label>
  );
};

const FilesInput = ({ onFileChange }) => {
  return (
    <input
      type="file"
      className="connect-input"
      onChange={(e) => {
        onFileChange(e);
      }}
      multiple
    />
  );
};

const PasswordInput = ({ authString, onChange }) => {
  return (
    <label htmlFor="password" className="col-span-2 row-start-4 row-end-5 ">
      <span className="input-label">비밀번호</span>
      <input
        value={authString || ""}
        type="password"
        name="authString"
        id="password"
        className="connect-input"
        onChange={(e) => {
          onChange(e);
        }}
      />
    </label>
  );
};

export const ChapterForm = React.memo(function ChapterForm({ onSubmit }) {
  const { activity_id } = useParams();
  const dispatch = useDispatch();

  const chapterInput = useSelector((state) => state.inputs.chapterInput);
  const { subject, article, authString } = chapterInput;
  const { data: activity } = useSelector(
    (state) => state.activities.activity[activity_id] || { data: null }
  );

  const { email: userEmail } = useSelector(
    (state) => state.auth.user || { email: "" }
  );

  const onChange = useCallback(
    (e) => {
      dispatch(changeChapterInput(e.target));
    },
    [dispatch]
  );

  const onFileChange = useCallback(
    (e) => {
      const files = e.target.files;
      if (files.length > 0) {
        dispatch(changeChapterInputFiles(files));
      } else {
        dispatch(removeChapterInputFiles());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getActivity(activity_id));
  }, [dispatch, activity_id]);

  useEffect(() => {
    return () => {
      dispatch(removeChapterInputFiles());
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-2 mx-1 my-2 ">
      {activity ? (
        <>
          <SubjectInput subject={subject} onChange={onChange} />
          <div className="col-span-2 row-start-2 row-end-3 ">
            <ClassicCKEditor
              onChange={onChange}
              value={article}
              name="article"
            />
          </div>
          <div className="col-span-2 row-start-3 row-end-4 ">
            <FilesInput onFileChange={onFileChange} />
          </div>
          {activity.ispw && userEmail !== activity.authorEmail && (
            <PasswordInput authString={authString} onChange={onChange} />
          )}
        </>
      ) : (
        <Guides.Loading />
      )}
    </div>
  );
});

export default ChapterForm;
