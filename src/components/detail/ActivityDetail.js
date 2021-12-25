import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Tag from '../common/Tag';
import { NoCards } from '../common/NoCards';
import '../../styles/Detail.scss';
import { PartiCard, LinkedCard } from '../common/PartiCard';
import { useSelector } from 'react-redux';

function arrSlice(arr, n) {
  let i;
  var result = [];
  for (i = 0; i < arr.length; i += n) result.push(arr.slice(i, i + n));
  return result;
}

const ActivityDetail = ({ activityDetail, ManageButton }) => {
  const user = useSelector((state) => state.auth.user);
  console.log('activity detail', activityDetail);
  const [writeRes, setWriteRes] = useState(false);
  const [resID, setResID] = useState();
  const {
    author,
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

  let { chapterid } = activityDetail;

  return (
    <div className="activity-detail">
      <div className="d-flex justify-content-between ">
        <h3>
          {title}
          {currentState === 1 ? (
            <Badge
              style={{ fontSize: '13px', marginLeft: '10px' }}
              bg="success"
            >
              진행중
            </Badge>
          ) : (
            <Badge
              bg="secondary"
              style={{ fontSize: '13px', marginLeft: '10px' }}
            >
              진행예정
            </Badge>
          )}
        </h3>
        <div
          className="d-flex flex-column align-items-end"
          style={{ fontSize: '12px' }}
        >
          <small className="text-muted">{type}</small>
          <small className="text-muted">{createDate}</small>
          <small className="text-muted">작성자 : {author}</small>
        </div>
      </div>
      <div
        className="d-flex justify-content-between mt-1 align-items-center"
        style={{ fontSize: '12px' }}
      >
        <div>
          진행일정 : {startDate} ~ {endDate}
        </div>
        <div>
          {user.email && user.email === author && (
            <div>
              <ManageButton activityId={id} />
            </div>
          )}
        </div>
      </div>
      <hr />
      <div className="mb-3">
        <PartiCard>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <div style={{ fontSize: '12px' }}>
              <b> 참여자</b>
            </div>
          </div>
          <div>
            {participants &&
              Array.isArray(participants) &&
              participants.map((participant, index) => (
                <PartiCard
                  key={`participant_${index}`}
                  style={{ marginRight: '5px' }}
                >
                  {participant.user_name}
                </PartiCard>
              ))}
          </div>
        </PartiCard>
      </div>
      <div className="mb-3">{description}</div>
      <div className="mb-3">
        {tags &&
          Array.isArray(tags) &&
          tags.map((tag, index) => {
            return (
              <Tag
                key={`tag_${index}`}
                tagName={tag.tag_name}
                tagId={tag.tag_id}
              />
            );
          })}
      </div>

      <b>챕터</b>
      <div>
        {chapterid && Array.isArray(chapterid) && chapterid.length > 0 ? (
          chapterid.map((chapter, index) => (
            <>
              <LinkedCard
                key={`chapter_${index}`}
                link={`/activities/${chapter.activityid}/chapter/${chapter.chapterid}`}
              >
                {index + 1}. {chapter.subject}
              </LinkedCard>
              <br />
            </>
          ))
        ) : (
          <div className="p-3">
            <NoCards msg="챕터가 없습니다." />
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityDetail;
