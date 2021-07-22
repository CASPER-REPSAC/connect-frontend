import React, { useState, useEffect } from 'react';
import {
  CardItemBlock,
  CardItemHeader,
  CardItemHeaderArticle,
  CardItemHeaderArticleContent,
  CardItemHeaderAuthIcon,
  CardItemHeaderParticipants,
  CardItemTag,
  CardItemHeaderArticleContentTitle,
} from './CardListItemStyled';
import Tag from '../common/Tag';

const widthBase = 18;
const maxWidth = 27;

const titleLength = 15;
const contentLength = 65;
const authorLength = 10;

const participantsLength = 4;

const CardListItem = ({ card, colors }) => {
  const { title, author, type, participants, read, content, tags } = card;

  const { tagColors } = colors;

  const [width, widthSet] = useState(widthBase);
  const [titleCut, titleCutSet] = useState(title);
  const [contentCut, contentCutSet] = useState(content);
  const [authorCut, authorCutSet] = useState(author);

  useEffect(() => {
    if (title.length > titleLength) {
      titleCutSet(titleCut.substr(0, titleLength) + '...');
    }

    if (content.length > contentLength) {
      contentCutSet(contentCut.substr(0, contentLength) + '...');
      widthSet(widthBase + 2);
    }

    if (author.length > authorLength) {
      authorCutSet(authorCut.substr(0, authorLength));
    }

    if (participants.length > participantsLength) {
      widthSet(widthBase + (participants.length - participantsLength));
    }

    if (width > maxWidth) {
      widthSet(maxWidth);
    }
  }, []);

  // 소개를 입력받아서 이 함수 안에서 일정 길이 넘어가면 자르고 ... 붙이기
  //

  return (
    <CardItemBlock sinWidth={width}>
      <CardItemHeader>
        <CardItemHeaderArticle>
          <CardItemHeaderAuthIcon
            style={{
              textAlign: 'center',
              lineHeight: '55px',
              fontWeight: 'bold',
              fontSize: '30px',
              color: 'white',
            }}
          >
            {author.substr(0, 1)}
          </CardItemHeaderAuthIcon>
          <CardItemHeaderArticleContent>
            <CardItemHeaderArticleContentTitle>
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
            </CardItemHeaderArticleContentTitle>
            <div className="content">{contentCut}</div>
          </CardItemHeaderArticleContent>
        </CardItemHeaderArticle>
        <CardItemHeaderParticipants>
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
        </CardItemHeaderParticipants>
      </CardItemHeader>
      <CardItemTag>
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
      </CardItemTag>
    </CardItemBlock>
  );
};

export default React.memo(CardListItem);
