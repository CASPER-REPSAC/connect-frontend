import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import Tag from '../common/Tag';

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
          <Link to={`/users/${author}`}>
            <div
              className="auth-icon"
              style={{
                textAlign: 'center',
                lineHeight: '55px',
                fontWeight: 'bold',
                fontSize: '30px',
                color: 'white',
              }}
            >
              {author.substr(0, 1)}
            </div>
          </Link>
          <div className="article">
            <div className="article-header">
              <Link to={url}>
                <div title={title} className="title dragable">
                  {title}
                </div>
              </Link>
              <div className="typeAuth">
                <Link to={`/types/${type}`}>
                  <div>{type}</div>
                </Link>
                <Link to={`/users/${author}`}>
                  <div title={author} className="author">
                    {author}
                  </div>
                </Link>
              </div>
            </div>
            <Link to={url}>
              <div className="introduce dragable" title={description}>
                {description}
              </div>
            </Link>
          </div>
        </div>
        <div className="participants">
          {participants.map((participant, index) => (
            <Link
              to={`/participants/${participant.user_id}`}
              className="participant"
              key={index}
              title={participant.user_id}
            >
              {participant.user_id}
            </Link>
          ))}
        </div>
      </div>
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
        })}
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
