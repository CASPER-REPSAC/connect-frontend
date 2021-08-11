import React, { useState, useEffect } from 'react';
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
import Tag from '../common/Tag';

const widthBase = 20;
const maxWidth = 27;

const maxTitle = 15;
const maxIntroduce = 65;
const maxAuthor = 10;

const maxParticipants = 4;

const CardListItem = ({ card, colors }) => {
  const { title, author, type, participants, read, introduce, tags } = card;
  const { tagColors } = colors;

  const [width, widthSet] = useState(widthBase);
  const [titleCut, titleCutSet] = useState(title);
  const [introduceCut, introduceCutSet] = useState(introduce);
  const [authorCut, authorCutSet] = useState(author);

  // ... 안 붙는 문제 해결하기
  useEffect(() => {
    let b = 0;
    let i = 0;
    for (i; i < maxIntroduce; i++) {
      let c = introduce.charCodeAt(i);
      b += c >> 7 ? 2 : 1;
      if (b > maxIntroduce) {
        introduceCutSet(introduce.substr(0, i));
        break;
      }
    }

    if (participants.length > maxParticipants) {
      widthSet(widthBase + participants.length - maxParticipants);
    }

    if (title.length > maxTitle) {
      titleCutSet(titleCut.substr(0, maxTitle) + '...');
    }

    if (author.length > maxAuthor) {
      authorCutSet(authorCut.substr(0, maxAuthor));
    }

    if (width > maxWidth) {
      widthSet(maxWidth);
    }
  }, []);

  useEffect(() => {
    if (introduce.length > introduceCut.length) {
      introduceCutSet(introduceCut + '...');
    }
  }, []);

  // 소개를 입력받아서 이 함수 안에서 일정 길이 넘어가면 자르고 ... 붙이기
  //

  return (
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
              <div title={title} className="title">
                {titleCut}
                <div className="Read">{read && '읽음'}</div>
              </div>
              <div className="typeAuth">
                <div>{type}</div>
                <div title={author} className="author">
                  {authorCut}
                </div>
              </div>
            </ArticleHeader>
            <div className="introduce">{introduceCut}</div>
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
  );
};

export default React.memo(CardListItem);
