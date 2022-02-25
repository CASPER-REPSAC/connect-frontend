import React, { useEffect, useCallback, useRef } from "react";
import { ClassicCKEditor } from "./ClassicCKEditor";
import {
  changeChapterInput,
  changeChapterInputFiles,
  removeChapterInputFiles,
} from "@/redux/inputs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getActivity } from "@/redux/activities";
import { Guides, Muted } from "#comp/common";
import { isArray } from "#serv";
import { FileSVG } from "@/icons";

const FilesInputList = ({ files }) => {
  const fileArray = Array.from(files || []);
  return (
    <div>
      {fileArray.length > 0 ? (
        fileArray.map((file) => (
          <Muted>
            {file.name} ({file.size}byte)
          </Muted>
        ))
      ) : (
        <Muted>선택된 파일이 없습니다.</Muted>
      )}
    </div>
  );
};

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
    <label htmlFor="file" className="relative inline-block">
      <div className="text-sm font-bold text-point-500 cursor-pointer ">
        <span className="text-xl mr-2">
          <FileSVG />
        </span>
        파일 추가
      </div>
      <input
        type="file"
        id="file"
        className="connect-input w-0 h-0 absolute overflow-hidden opacity-0"
        onChange={(e) => {
          onFileChange(e);
        }}
        multiple
      />
    </label>
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
  const chapterInputFiles = useSelector((state) => state.inputs.files);
  const { subject, article, authString } = chapterInput;
  const activity = useSelector(
    (state) => state.activities.activity[activity_id]
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
    <div className="flex flex-col gap-2  ">
      {activity ? (
        <>
          <SubjectInput subject={subject} onChange={onChange} />
          <ClassicCKEditor onChange={onChange} value={article} name="article" />
          <div>
            <FilesInput onFileChange={onFileChange} />
            <FilesInputList files={chapterInputFiles} />
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
