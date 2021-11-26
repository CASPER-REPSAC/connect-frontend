import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import FileUploadTest from '../write/FileUploadTest';

const ChapterDetail = ({ chapterData, match }) => {
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
        {last !== 0 ? (
          <Link
            to={`/activities/${activityid}/chapter/${last}`}
            className="m-1"
          >
            <FontAwesomeIcon icon={faChevronLeft} /> 
            <small>
            이전 챕터
            </small> 
          </Link>
        ) : (
          <Link
            to={`/activities/${activityid}/chapter/${chapterid}`}
            className="m-1"
          >
             <small>
            이전 챕터
            </small> 
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
        )}

        <div>{" "}</div>
        <Link to={`/activities/${activityid}/chapter/${next}`} className="m-1">
           <small>
            다음 챕터
            </small> 
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

      <FileUploadTest match={match} />
    </div>
  );
};

export default ChapterDetail;
