import React from "react";
import { Card } from "#comp/common";
import { isArray } from "#serv/helpers";
import { Link } from "react-router-dom";
import { ChapterHeader } from "./ChapterHeader";
import { CommentList } from "./CommentList";

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
  } = chapter;
  return (
    <>
      <span className="text-text-500 text-xs font-bold ">Chapter</span>
      <h2>{subject}</h2>
      <div className="text-text-400 text-xs whitespace-normal">
        {`${created_time.substr(0, 10)} ${created_time.substr(
          11,
          8
        )} | 수정 ${modified_time.substr(0, 10)} ${modified_time.substr(
          11,
          8
        )}`}
      </div>
      <hr className=" mt-2 mb-4" />
      <div className="whitespace-normal break-words flex-none">
        <div dangerouslySetInnerHTML={{ __html: article }}></div>
      </div>
    </>
  );
};

export const ChapterDetail = ({ activity, chapter, loading }) => {
  return (
    <>
      <div className="flex-none">
        <ChapterHeader />
        {loading && !chapter && <>로딩중..</>}
        {chapter && activity && <ChapterDetailContent chapter={chapter[0]} />}
      </div>

      <div className="flex-none">
        {chapter && <CommentList comments={chapter[2]} />}
      </div>
    </>
  );
};

export default ChapterDetail;
