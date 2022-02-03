import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Tag from '../common/Tag';
import { NoCards } from '../common/NoCards';
import { RecnetBox } from '../common/RecentBox';
import '../../styles/Detail.scss';
import { PartiCard, LinkedCard, UserIcon } from '../common/PartiCard';
import { useSelector } from 'react-redux';

function arrSlice(arr, n) {
  let i;
  var result = [];
  for (i = 0; i < arr.length; i += n) result.push(arr.slice(i, i + n));
  return result;
}

const ActivityDetail = ({ activityDetail, ManageButton }) => {
  const user = useSelector((state) => state.auth.user);
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
    // PW,
  } = activityDetail;

  let { chapterid } = activityDetail;
  chapterid = arrSlice(chapterid, 10);

  return (
    <div className="activity-detail">
      <div className="d-flex justify-content-between ">
        <h3>
          <b>{title}</b>
          {currentState === 1 && (
            <Badge
              style={{
                fontSize: '13px',
                marginLeft: '10px',
              }}
              bg="success"
            >
              진행중
            </Badge>
          )}
          {currentState === 0 && (
            <Badge
              style={{
                fontSize: '13px',
                marginLeft: '10px',
              }}
              bg="info"
            >
              진행예정
            </Badge>
          )}
          {currentState === 2 && (
            <Badge
              style={{
                fontSize: '13px',
                marginLeft: '10px',
              }}
              bg="secondary"
            >
              종료됨
            </Badge>
          )}
        </h3>
        <div
          className="d-flex flex-column align-items-end"
          style={{ fontSize: '13px' }}
        >
          <small className="text-muted">{type}</small>
          <small className="text-muted">{createDate}</small>
          <small className="text-muted">작성자 : {author}</small>
        </div>
      </div>
      <div
        className="d-flex justify-content-between mt-1 align-items-center"
        style={{ fontSize: '13px' }}
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
      <div className="d-flex mb-3 article-grid">
        <div
          className="mb-3 description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="side">
          <div className="particard">
            <PartiCard>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div style={{ fontSize: '12px' }} className="mb-1">
                  <b> 참여자</b>
                </div>
              </div>
              {console.log(activityDetail)}
              <div className="d-flex wrap">
                {participants &&
                  Array.isArray(participants) &&
                  participants.length > 0 &&
                  participants.map((participant, index) => {
                    if (participant.profile.email === author) {
                      return (
                        <UserIcon
                          key={`participant_${index}`}
                          userName={`👑${participant.profile.name}`}
                          img={participant.profile.picture}
                          leader
                        />
                      );
                    }
                    return (
                      <UserIcon
                        key={`participant_${index}`}
                        userName={participant.profile.name}
                        img={participant.profile.picture}
                      />
                    );
                  })}
              </div>
            </PartiCard>
          </div>
          <div className="mb-3 tags">
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
        </div>
      </div>

      <div className="chapters">
        <b>챕터</b>
        <div className="chapter text-break">
          {chapterid && Array.isArray(chapterid) && chapterid.length > 0 ? (
            chapterid.map((chapters, index) => (
              <div key={index} style={{ marginRight: '50px' }}>
                {chapters.map((chapter, index1) => (
                  <div key={index1} className="">
                    <Link
                      to={`/activities/${chapter.activityid}/chapter/${chapter.chapterid}`}
                      className="d-inline-block text-truncate"
                      style={{ maxWidth: '200px' }}
                    >
                      {index * 10 + index1 + 1}. {chapter.subject}
                    </Link>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <NoCards msg="챕터가 없습니다." margin="10px" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
