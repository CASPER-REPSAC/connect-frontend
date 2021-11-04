import React from 'react';

const ActivityDetail = ({ activityDetail }) => {
  console.log('activity detail', activityDetail);
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
            <li key={index}> {chapter.subject}</li>
          ))
        ) : (
          <>챕터가 없습니다.</>
        )}
      </ol>
    </>
  );
};

export default ActivityDetail;
