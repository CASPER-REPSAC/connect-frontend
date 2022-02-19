import React from "react";
import {
  PenButton,
  ChapterRemoveButton,
  ChapterUpdateButton,
  WithToolTip,
} from "#comp/common";
import { isArray, formatDateTimeWithTimeZone } from "#serv";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CommentList } from "./CommentList";
import { deleteChapter } from "@/redux/submits";
import { useParams, useNavigate } from "react-router-dom";

const ChapterHeaderNav = ({ type, acitvityTitle, chapterSequence }) => {
  return (
    <span className="text-text-500 text-xs font-bold">
      Activity | {type} | {acitvityTitle} | Chapter [{chapterSequence}]
    </span>
  );
};

const AuthorIcons = ({ author, onRemove }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activity_id, chapter_id } = useParams();

  const onDelete = () => {
    dispatch(deleteChapter(activity_id, chapter_id, navigate));
  };

  if (user && user.email === author) {
    return (
      <div className="flex gap-2">
        <ChapterUpdateButton />
        <ChapterRemoveButton
          onRemove={() => {
            onDelete();
          }}
        />
      </div>
    );
  } else return <></>;
};

const ChapterCreateUpdateTime = ({ created_time, modified_time }) => {
  return (
    <div className="text-text-400 text-xs whitespace-normal">
      {`${formatDateTimeWithTimeZone(
        created_time
      )} | 수정 ${formatDateTimeWithTimeZone(modified_time)}`}
    </div>
  );
};

const ChapterHeader = ({ chapter, activity }) => {
  const {
    chapterid,
    subject: chapterTitle,
    created_time,
    modified_time,
  } = chapter;

  const {
    title: acitvityTitle,
    type,
    chapterid: activityChapters,
    author,
  } = activity;
  const chapterSequence = `${
    activityChapters.findIndex((chapter) => chapter.chapterid === chapterid) + 1
  }`.padStart(3, "0");

  return (
    <>
      <ChapterHeaderNav
        type={type}
        acitvityTitle={acitvityTitle}
        chapterSequence={chapterSequence}
      />
      <ChapterTitle chapterSequence={chapterSequence} title={chapterTitle} />
      <div className="flex justify-between items-center ">
        <ChapterCreateUpdateTime
          created_time={created_time}
          modified_time={modified_time}
        />
        <AuthorIcons author={author} />
      </div>
    </>
  );
};

const ChapterTitle = ({ chapterSequence, title }) => {
  return (
    <h2>
      <span className="text-point-500 mr-2">[{chapterSequence}]</span>
      {title}
    </h2>
  );
};

const ChapterArticle = ({ article }) => {
  return (
    <div className="whitespace-normal break-words flex-none">
      <div dangerouslySetInnerHTML={{ __html: article }}></div>
    </div>
  );
};

const ChapterContent = ({ chapter, activity }) => {
  const { article } = chapter;

  return (
    <>
      <ChapterHeader chapter={chapter} activity={activity} />
      <hr className=" mt-2 mb-4" />
      <ChapterArticle article={article} />
    </>
  );
};

const ChapterFiles = ({ files }) => {
  return (
    <div className="my-2 flex gap-3">
      {files.map((file) => {
        return (
          <a
            key={file.filepk}
            href={`api/activities/${file.activityid}/chapter/${file.chapterid}/download/${file.filepath}`}
          >
            {file.filename}
          </a>
        );
      })}
    </div>
  );
};

export const ChapterDetail = ({ activity, chapter, loading, onDelete }) => {
  return (
    <>
      <div className="flex-none">
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
