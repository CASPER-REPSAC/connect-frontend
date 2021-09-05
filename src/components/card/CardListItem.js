import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  CardItemBlock,
  TopSection,
  ArticleBlock,
  Article,
  AuthIcon,
  Participants,
  Tags,
  ArticleHeader,
} from './CardListItemStyled';
import { Link } from 'react-router-dom';
import Tag from '../common/Tag';

const widthBase = 18;
const maxWidth = 25;

const maxTitle = 15;
const maxIntroduce = 65;
const maxAuthor = 10;

const maxParticipants = 4;

const CardListItem = ({ card, colors }) => {
  const { title, author, type, participants, description, tags, id } = card;
  let url = '/activities/' + type.toLowerCase() + '/' + id;
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
    <Link to={url}>
      <CardItemBlock sinWidth={width}>
        <TopSection>
          <ArticleBlock>
            <AuthIcon
              style={{
                textAlign: 'center',
                lineHeight: '55px',
                fontWeight: 'bold',
                fontSize: '30px',
                color: 'white',
              }}
            >
              {author.substr(0, 1)}
            </AuthIcon>
            <Article>
              <ArticleHeader>
                <div title={title} className="title dragable">
                  {title}
                </div>
                <div className="typeAuth">
                  <div>{type}</div>
                  <div title={author} className="author">
                    {author}
                  </div>
                </div>
              </ArticleHeader>
              <div className="introduce dragable" title={description}>
                {description}
              </div>
            </Article>
          </ArticleBlock>
          <Participants>
            {participants.map((participant, index) => (
              <div
                className="participant"
                key={index}
                title={participant}
                style={{
                  textAlign: 'center',
                  lineHeight: '30px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  color: 'white',
                }}
              >
                {participant.substr(0, 1)}
              </div>
            ))}
          </Participants>
        </TopSection>
        <Tags>
          <div>
            {tags.map((tag, index) => {
              let c = { tagColor: tagColors[tag] };
              return (
                <Tag {...c} key={index}>
                  {tag}
                </Tag>
              );
            })}
          </div>
        </Tags>
      </CardItemBlock>
    </Link>
  );
};

export default connect(
  (state) => ({
    colors: state.colors,
  }),
  {},
)(CardListItem);
