import React from 'react';
import { Link } from 'react-router-dom';
import './Tag.scss';

const tagColor = [
  '#D49926',
  '#dd5A2E',
  '#9335E8',
  '#072E36',
  '#4D992C',
  '#63283E',
  '#634651',
  '#B0466D',
  '#1B6354',
  '#962F0B',
];

const BigTag = ({ tagId, tagName }) => {
  const colorIndex = tagId % tagColor.length;
  return (
    <>
      <span>
        <Link
          to={`/tags/${tagId}`}
          className="styled-tag big-tag"
          style={{ backgroundColor: tagColor[colorIndex] }}
        >
          {tagName}
        </Link>
      </span>
    </>
  );
};

const Tag = ({ tagId, tagName }) => {
  const colorIndex = tagId % tagColor.length;
  return (
    <span>
      <Link
        to={`/tags/${tagId}`}
        className="styled-tag"
        style={{ backgroundColor: tagColor[colorIndex] }}
      >
        {tagName}
      </Link>
    </span>
  );
};

const NoLinkTag = ({ style, tagId, tagName }) => {
  const colorIndex = tagId % tagColor.length;
  style = { ...style, backgroundColor: tagColor[colorIndex] };
  return (
    <span className="styled-tag" style={style}>
      {tagName}
    </span>
  );
};

export { BigTag, NoLinkTag };
export default Tag;
