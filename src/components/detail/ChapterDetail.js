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
  console.log('chapterData', chapterData);
  const {
    activityid,
    article,
    chapterid,
    created_time,
    last,
    modified_time,
    next,
    subject,
  } = chapterData[0];

  const files = chapterData[1];

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
            <FontAwesomeIcon icon={faChevronLeft} />
             <small>
            이전 챕터
            </small> 
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
        {
          files && Array.isArray(files) ?(<>
            {
              files.map((file, index)=> {
                return (<div  className="text-secondary"><small><a key={index} href={`${process.env.REACT_APP_BACK_SERVER_BASE_URL}/api/activities/${activityid}/chapter/${last}/download/${file.filepath}`}>{file.filename}</a></small></div>)
              })
            }
            </>
          ):(<>파일이 없습니다.</>)
        }
      </div>
      <article className="mt-3">
        <p>{article}</p>
      </article>

      <FileUploadTest match={match} />
    </div>
  );
};

export default ChapterDetail;
