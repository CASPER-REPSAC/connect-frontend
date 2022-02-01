import React from "react";
import { Card } from "#comp/common";
import { isArray } from "#serv/helpers";
import { Link } from "react-router-dom";
import { ChapterHeader } from "./ChapterHeader";

const ChapterDetailContent = ({ chapter }) => {
  const {
    activityid,
    chapterid,
    subject,
    created_time,
    modified_time,
    article,
    filepath,
    fileid,
    last,
    next,
  } = chapter[0];
  return (
    <>
      <h2>{subject}</h2>
      <div className="text-text-400 text-xs whitespace-normal">
        {`작성 ${created_time.substr(0, 10)} ${created_time.substr(
          11,
          8
        )} | 수정 ${modified_time.substr(0, 10)} ${modified_time.substr(
          11,
          8
        )}`}
      </div>
      <hr className=" mt-2 mb-4" />
      <div className="whitespace-normal break-words flex-none">
        <div dangerouslySetInnerHTML={{ __html: subject }}></div>
      </div>
    </>
  );
};

export const ChapterDetail = ({ activity, chapter, loading }) => {
  return (
    <>
      <div className=" flex flex-col justify-between gap-3">
        <div className="flex-none">
          <ChapterHeader />
          {loading && !chapter && <>로딩중..</>}
          {chapter && activity && <ChapterDetailContent chapter={chapter} />}
        </div>
      </div>
    </>
  );
};

export default ChapterDetail;
