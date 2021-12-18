import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge} from "react-bootstrap";
import Tag from "../common/Tag";

const ActivityDetail = ({ activityDetail }) => {
  console.log('activity detail', activityDetail);
  const [writeRes, setWriteRes] = useState(false);
  const [resID, setResID] = useState();
  const {
    author,
    chapterid,
    createDate,
    currentState,
    description,
    endDate,
    id,
    participants,
    startDate,
    tags,
    title,
    type,
    url,
    viewerNum,
  } = activityDetail;

  return (
    <>
    <div className="d-flex justify-content-between">
      <h3>{title}
      {
        currentState===1 ?(<Badge style={{fontSize:"13px", marginLeft:"10px"}} bg="success">진행중</Badge> 
        ):(<Badge bg="secondary" style={{fontSize:"13px", marginLeft:"10px"}}>진행예정</Badge>
        )
      }
      </h3>
      <div className="d-flex flex-column align-items-end" style={{fontSize:"12px"}}>
      <small className="text-muted">{type}</small>
      <small className="text-muted">{createDate}</small>
      <small className="text-muted">작성자 : {author}</small>
      </div>
    </div>
      <div>
      진행일정 : {startDate} ~ {endDate}
      </div>
      <hr />
      <div className="mb-3">
      {description}
      </div>
      <div className="mb-3">
        {tags && Array.isArray(tags) && tags.map((tag, index) => {
          return (
            <Tag key={index} tagName={tag.tag_name} tagId={tag.tag_id}/>
          );
        })}
      </div>
      <b>챕터</b>
      <ol>
        {chapterid && Array.isArray(chapterid) ? (
          chapterid.map((chapter, index) => (
            <li key={index}>
              <Link
                to={`/activities/${chapter.activityid}/chapter/${chapter.chapterid}`}
              >
                {' '}
                {chapter.subject}
              </Link>
            </li>
          ))
        ) : (
          <>챕터가 없습니다.</>
        )}
      </ol>
    </>
  );
};

export default ActivityDetail;
