import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const ChapterDetail = ({ chapterData }) => {
  console.log('ChapterDetail', chapterData[0]);
  const {
    activityid,
    article,
    chapterid,
    created_time,
    filepath,
    filesize,
    last,
    modified_time,
    next,
    subject,
  } = chapterData[0];

  return (
    <div className="chapter-detail">
      <div className="d-flex align-items-center small">
        <Link to={`/activities/${activityid}/chapter/${last}`} className="m-1">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <div>chapter {chapterid}</div>
        <Link to={`/activities/${activityid}/chapter/${next}`} className="m-1">
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <h3>{subject}</h3>

        <small className="text-muted">
          작성 {created_time} | 수정 {modified_time}
        </small>
      </div>
      <hr />

      <div className="text-secondary">
        {filepath && filesize ? <>파일 다운로드({filesize})</> : <>파일 없음</>}
      </div>
      <article className="mt-3">
        <p>{article}</p>
      </article>
    </div>
  );
};

export default ChapterDetail;
