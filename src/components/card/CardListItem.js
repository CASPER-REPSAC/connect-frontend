import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import Tag from '../common/Tag';
import { UserIcon } from '../common/UserIcon';

import './CardItem.scss';

const widthBase = 18;
const maxWidth = 25;

const maxParticipants = 4;

const CardListItem = ({ card, colors }) => {
  const { title, author, type, participants, description, tags, id } = card;
  let url = '/activities/' + id;
  const { tagColors } = colors;

  const [width, widthSet] = useState(widthBase);

  // ... 안 붙는 문제 해결하기
  useEffect(() => {
    if (participants.length > maxParticipants) {
      widthSet(widthBase + participants.length - maxParticipants);
    }

    if (width > maxWidth) {
      widthSet(maxWidth);
    }
  }, []);

  // 소개를 입력받아서 이 함수 안에서 일정 길이 넘어가면 자르고 ... 붙이기
  //

  return (
    <div className="card-item-block">
      <div className="top-section">
        <div className="article-block">
          <UserIcon
            user={author}
            url={`/users/${author}`}
            width="50px"
            height="50px"
            borderRadius="8px"
          />

          <div className="article">
            <div className="article-header">
              <Link to={url}>
                <div title={title} className="title dragable">
                  {title}
                </div>
              </Link>
            </div>
            <div className="typeAuth">
              <Link to={url}>
                <div>{type}</div>
              </Link>
              {/* <Link to={`/users/${author || 'test@test.com'}`}>
                <div title={author || 'test@test.com'} className="author">
                  {author || 'test@test.com'}
                </div>
              </Link> */}
            </div>
          </div>
        </div>
        <div className="participants">
          {participants && <small>참여자 {participants.length}명</small>}
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-end">
        <div className="tags">
          {tags.map((tag, index) => {
            let c = { tagColor: tagColors[tag] };
            if (index < 4) {
              return (
                <Tag
                  {...c}
                  key={index}
                  tagId={tag.tag_id}
                  tagName={tag.tag_name}
                />
              );
            }
            return <div key={index} style={{ display: 'none' }}></div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    colors: state.colors,
  }),
  {},
)(CardListItem);
