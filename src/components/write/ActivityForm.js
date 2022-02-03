import React from "react";
import { ClassicCKEditor } from "./ClassicCKEditor";
import { SubmitButton } from "#comp/common";

export const ActivityForm = ({ onChange, onSubmit, activityInput }) => {
  const {
    title,
    type,
    author,
    createDate,
    description,
    startDate,
    endDate,
    currentState,
    authString,
  } = activityInput;

  return (
    <div
      className="grid gap-2 mx-1 my-2 "
      style={{ gridTemplateColumns: "9rem 9rem 9rem 9rem 1fr" }}
    >
      <div className="col-start-1 col-end-2 row-start-1 row-end-2 flex gap-3">
        <select
          name="type"
          id="type"
          className=" connect-input col-start-1 col-end-2 row-start-1 row-end-2"
          value={type}
          onChange={(e) => {
            onChange(e);
          }}
        >
          <option value="Project">Project</option>
          <option value="Study">Study</option>
          <option value="CTF">CTF</option>
        </select>
        <select
          name="currentState"
          id="currentState"
          className="connect-input col-start-1 col-end-2 row-start-1 row-end-2"
          value={currentState}
          onChange={(e) => {
            onChange(e);
          }}
        >
          <option value="0">예정</option>
          <option value="1">진행</option>
          <option value="2">종료</option>
        </select>
      </div>

      <label
        htmlFor="title"
        className="col-start-2 col-end-[-1] row-start-1 row-end-2 items-stretch"
      >
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          className="connect-input w-full pl-1"
          onChange={(e) => {
            onChange(e);
          }}
        />
      </label>
      <div className="col-span-5 row-start-2 row-end-3 ">
        <ClassicCKEditor onChange={onChange} value={description} />
      </div>
      <label htmlFor="startDate" className="col-span-2 row-start-3 row-end-4">
        <span className="input-label">시작일</span>
        <input
          value={startDate}
          type="date"
          name="startDate"
          id="startDate"
          className="connect-input"
          onChange={(e) => {
            onChange(e);
          }}
        />
      </label>
      <label htmlFor="endDate" className="col-span-2 row-start-3 row-end-4 ">
        <span className="input-label">종료일</span>
        <input
          value={endDate}
          type="date"
          name="endDate"
          id="endDate"
          className="connect-input"
          onChange={(e) => {
            onChange(e);
          }}
        />
      </label>

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
      <div className="col-start-[-1] col-end-[-2] row-start-6 row-end-7 text-right ">
        <SubmitButton onClick={onSubmit} />
      </div>
    </div>
  );
};

export default ActivityForm;
