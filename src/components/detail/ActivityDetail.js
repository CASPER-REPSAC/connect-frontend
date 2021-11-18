import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
      <h3>{title}</h3>
      <b>챕터</b>
      <ol>
        {chapterid[0] ? (
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
      <h3>받아온 데이터</h3>

      <ul>
        {Object.keys(activityDetail).map((key) => {
          if (typeof activityDetail[key] === 'object') {
            return (
              <li>
                {key} - {JSON.stringify(activityDetail[key])}
              </li>
            );
          } else {
            return (
              <li key={key}>
                {key} - {activityDetail[key]}
              </li>
            );
          }
        })}
      </ul>
    </>
  );
};

export default ActivityDetail;
