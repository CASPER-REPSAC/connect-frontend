import React from "react";
import { Card } from "#comp/common";
import { isArray } from "#serv/helpers";
import { Link } from "react-router-dom";
import { ChapterHeader } from "./ChapterHeader";
import { CommentList } from "./CommentList";

const ChapterContent = ({ chapter, activity }) => {
  const {
    // activityid,
    chapterid,
    subject,
    created_time,
    modified_time,
    article,
    // filepath,
    // fileid,
    // last,
    // next,
  } = chapter;

  const { title, type, chapterid: activityChapters } = activity;

  const chapterSequence = `${
    activityChapters.findIndex((chapter) => chapter.chapterid === chapterid) + 1
  }`.padStart(3, "0");

  return (
    <>
      <span className="text-text-500 text-xs font-bold ">
        Activity | {type} | {title} | Chapter [{chapterSequence}]
      </span>
      <h2>
        <span className="text-text-500 mr-2">[{chapterSequence}]</span>
        {subject}
      </h2>
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

const ChapterFiles = ({ files }) => {
  return (
    <div className="my-2 flex gap-3">
      {files.map((file) => {
        return (
          <a
            href={`api/activities/${file.activityid}/chapter/${file.chapterid}/download/${file.filepath}`}
          >
            {file.filename}
          </a>
        );
      })}
    </div>
  );
};

export const ChapterDetail = ({ activity, chapter, loading }) => {
  return (
    <>
      <div className="flex-none">
        {/* <ChapterHeader /> */}
        <ChapterContent chapter={chapter[0]} activity={activity} />
      </div>

      <div className="flex-none">
        {isArray(chapter[1]) && <ChapterFiles files={chapter[1]} />}
        <CommentList comments={chapter[2]} />
      </div>
    </>
  );
};

export default ChapterDetail;
