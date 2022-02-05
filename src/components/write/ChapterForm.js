import React from "react";
import { ClassicCKEditor } from "./ClassicCKEditor";

export const ChapterForm = ({
  onChange,
  onFileChange,
  onSubmit,
  chapterInput,
  ispw,
  userEmail,
  authorEmail,
}) => {
  const { subject, article, authString } = chapterInput;

  return (
    <div
      className="grid gap-2 mx-1 my-2 "
      style={{ gridTemplateColumns: "9rem  1fr" }}
    >
      <label
        htmlFor="subject"
        className="col-start-1 col-end-[-1] row-start-1 row-end-2 items-stretch"
      >
        <input
          type="text"
          id="subject"
          name="subject"
          value={subject}
          className="connect-input w-full pl-1"
          onChange={(e) => {
            onChange(e);
          }}
        />
      </label>
      <div className="col-span-2 row-start-2 row-end-3 ">
        <ClassicCKEditor onChange={onChange} value={article} name="article" />
      </div>
      <div className="col-span-2 row-start-3 row-end-4 ">
        <input
          type="file"
          className="connect-input"
          onChange={(e) => {
            onFileChange(e);
          }}
          multiple
        />
      </div>
      {ispw && userEmail !== authorEmail && (
        <label htmlFor="password" className="col-span-2 row-start-4 row-end-5 ">
          <span className="input-label">비밀번호</span>
          <input
            value={authString}
            type="password"
            name="authString"
            id="password"
            className="connect-input"
            onChange={(e) => {
              onChange(e);
            }}
          />
        </label>
      )}
    </div>
  );
};

export default ChapterForm;
