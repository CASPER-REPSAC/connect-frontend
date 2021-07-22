import React from 'react';
import styled, { css } from 'styled-components';
import Tag from '../common/Tag';

// id: 1,
//       title: 'this is title',
//       type: 'study',
//       author: '5 11',
//       participants: ['5 11', 'floodnut', 'woo'],
//       createDate: '2021-07-01',
//       content: 'this is content.',
//       currentState: 'running',
//       startDate: '2021-07-05',
//       endDate: '2021-07-27',
//       read: false,

const CardItemBlock = styled.div`
  border: solid 1px Tan;
  border-radius: 0.8rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 10rem;
  width: 20rem;
  background: WhiteSmoke;
  * {
    overflow: hidden;
  }
  ${(props) =>
    props.sinWidth &&
    css`
      width: ${props.sinWidth}rem;
    `}
`;

const CardItemHeader = styled.div`
  display: flex;
`;

const CardItemHeaderAuth = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0px;
  padding-top: 0.3rem;
  margin-right: 0.7rem;

  div: last-child {
    max-width: 3rem;
  }
`;

const CardItemHeaderAuthIcon = styled.div`
  height: 3rem;
  width: 3rem;
  background: gray;
  border-radius: 0.3rem;
`;

const CardItemHeaderArticle = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  div:last-child {
    font-size: 0.95rem;
    max-height: 3.85em;
  }
`;

const CardItemHeaderArticleTitle = styled.div`
  font-weight: bold;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;

  div: first-child {
    max-width: 10rem;
    height: 1.5rem;
    font-size: 1rem;
    display: flex;
    .Read {
      font-size: 0.5rem;
      color: gray;
      align: center;
      display: inline-block;
    }
  }
  div: last-child {
    flex: 1;
    text-align: right;
  }
`;

const CardItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardListItem = ({ card, tagColors }) => {
  const {
    title,
    author,
    type,
    read,
    currentState,
    startDate,
    endDate,
    content,
    tags,
    id,
  } = card;

  // 소개를 입력받아서 이 함수 안에서 일정 길이 넘어가면 자르고 ... 붙이기
  //

  let width = 20 + (Math.floor(Math.sin(id) * 100) % 4);
  return (
    <CardItemBlock sinWidth={width}>
      <CardItemHeader>
        <CardItemHeaderAuth>
          <CardItemHeaderAuthIcon></CardItemHeaderAuthIcon>
          <div title={author}>{author}</div>
        </CardItemHeaderAuth>
        <CardItemHeaderArticle>
          <CardItemHeaderArticleTitle>
            <div>
              <div title={title}>{title}</div>
              <div className="Read">{read && '읽음'}</div>
            </div>
            <div>{type}</div>
          </CardItemHeaderArticleTitle>
          <div>{content}</div>
        </CardItemHeaderArticle>
      </CardItemHeader>
      <CardItemFooter>
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
        <div>
          <Tag currentState={currentState}>
            {startDate} - {endDate}
          </Tag>
        </div>
      </CardItemFooter>
    </CardItemBlock>
  );
};

export default React.memo(CardListItem);
