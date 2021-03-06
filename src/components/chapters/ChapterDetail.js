import React, { useEffect, useState } from "react";
import { ChapterRemoveButton, ChapterUpdateButton } from "#comp/common";
import { isArray, formatDateTimeWithTimeZone } from "#serv";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CommentList } from "#comp/comments";
import { deleteChapter } from "@/redux/chapters";
import { useParams, useNavigate } from "react-router-dom";
import { getChapter } from "@/redux/chapters";
import { PreviewFile } from "./PreviewFile";
import { CaretLeftSVG, CaretRightSVG } from "@/icons";

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

  const onModify = () => {
    navigate(`/update/${activity_id}/chapter/${chapter_id}`);
  };

  if (user && user.email === author) {
    return (
      <div className="flex gap-2">
        <ChapterUpdateButton
          onClick={() => {
            onModify();
          }}
        />
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
      <div className="flex flex-col gap-2 md:flex-row itmes-start justify-between md:items-center ">
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
    <h1>
      <span className="text-point-500 mr-2">[{chapterSequence}]</span>
      {title}
    </h1>
  );
};

const ChapterArticle = ({ article }) => {
  return (
    <div className="whitespace-normal break-words flex-none text-text-800">
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
          <div className="relative">
            <a
              key={file.filepk}
              href={`/api/activities/${file.activityid}/chapter/${file.chapterid}/download/${file.filepath}`}
              className="peer"
            >
              {file.filename}
            </a>
            <PreviewFile file={file} />
          </div>
        );
      })}
    </div>
  );
};

const PrevNextChapterNav = ({ prevChapter, nextChapter }) => {
  return (
    <div className="flex gap-2 justify-center text-sm text-text-500">
      {prevChapter && (
        <Link
          to={`/activities/${prevChapter.activityid}/chapter/${prevChapter.chapterid}`}
        >
          <CaretLeftSVG /> {prevChapter.subject}
        </Link>
      )}
      {prevChapter && nextChapter && <div>|</div>}
      {nextChapter && (
        <Link
          to={`/activities/${nextChapter.activityid}/chapter/${nextChapter.chapterid}`}
        >
          {nextChapter.subject} <CaretRightSVG />
        </Link>
      )}
    </div>
  );
};

export const ChapterDetail = ({ activity, onDelete }) => {
  const { activity_id, chapter_id } = useParams();
  const chapter = useSelector((state) => state.chapters[chapter_id] || null);
  const [prevChapter, setPrevChapter] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (chapter) {
      setPrevChapter(
        activity.chapterid.find((a) => a.chapterid === chapter[0]?.last) || null
      );
      if (
        activity.chapterid.find((a) => a.chapterid === chapter[0]?.next)
          ?.chapterid !== Number(chapter_id)
      ) {
        setNextChapter(
          activity.chapterid.find((a) => a.chapterid === chapter[0]?.next) ||
            null
        );
      }
    }
  }, [activity, chapter_id, chapter]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getChapter(activity_id, chapter_id));
  }, [dispatch, activity_id, chapter_id]);

  return (
    <>
      {chapter && (
        <div className="flex flex-col justify-between h-full">
          <div className="flex-none">
            <ChapterContent chapter={chapter[0]} activity={activity} />
          </div>
          <div className="flex-none">
            {isArray(chapter[1]) && <ChapterFiles files={chapter[1]} />}
            <PrevNextChapterNav
              prevChapter={prevChapter}
              nextChapter={nextChapter}
            />
            <CommentList comments={chapter[2]} />
          </div>
        </div>
      )}
    </>
  );
};

export default ChapterDetail;
