import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import FileUploadTest from '../write/FileUploadTest';
import "../../styles/Detail.scss";

function arrSlice(arr, n) {
  let i;
  var result = [];
  for(i=0; i<arr.length; i+=n) result.push(arr.slice(i, i+n));
  return result;
}

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

  const files = arrSlice(chapterData[1], 3);

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

      <div className="files">
        {
          files && Array.isArray(files) ?(<>
            {
              files.map((file, index)=> 
                (<div key={index} style={{marginRight:"20px"}}>{file.map((file, index)=>
                (<div key={index}><a href={`${process.env.REACT_APP_BACK_SERVER_BASE_URL}/api/activities/${activityid}/chapter/${last}/download/${file.filepath}`}><small className="text-secondary">{file.filename}</small></a></div>)
                )}</div>)
              )
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
