import React from "react";
import { Card, Muted } from "#comp/common";
import { useNavigate } from "react-router-dom";

export const ChapterListItem = ({ chapter, expended }) => {
  const navigate = useNavigate();
  const {
    activityid,
    chapterid,
    subject,
    // created_time,
    // modified_time,
    article,
  } = chapter;

  const newArticle = article
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/&nbsp;/gi, " ");

  return (
    <>
      <Card.Frame
        onClick={() => {
          navigate(`/activities/${activityid}/chapter/${chapterid}`);
        }}
        expended={expended}
        className="cursor-pointer h-full border border-text-200"
      >
        <Card.Title className="whitespace-normal">
          <h4>
            {subject}
            <Muted>챕터</Muted>
          </h4>
        </Card.Title>
        <div className=" mb-2 max-h-12 overflow-hidden truncate text-sm text-text-600">
          {newArticle}
        </div>
      </Card.Frame>
    </>
  );
};
