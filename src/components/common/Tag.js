import React from 'react';
import { Link } from 'react-router-dom';
import './Tag.scss';
import { useSelector } from 'react-redux';

const BigTag = ({ tagId, tagName }) => {
  const { tagColors } = useSelector((state) => ({
    tagColors: state.colors.tagColors,
  }));
  const colorIndex = tagId % tagColors.length;
  return (
    <>
      <span>
        <Link
          to={`/tags/${tagId}`}
          className="styled-tag big-tag"
          style={{ backgroundColor: tagColors[colorIndex] }}
        >
          {tagName}
        </Link>
      </span>
    </>
  );
};

const Tag = ({ tagId, tagName }) => {
  const { tagColors } = useSelector((state) => ({
    tagColors: state.colors.tagColors,
  }));
  const colorIndex = tagId % tagColors.length;
  return (
    <span>
      <Link
        to={`/tags/${tagId}`}
        className="styled-tag"
        style={{ backgroundColor: tagColors[colorIndex] }}
      >
        {tagName}
      </Link>
    </span>
  );
};

const NoLinkTag = ({ style, tagId, tagName }) => {
  const { tagColors } = useSelector((state) => ({
    tagColors: state.colors.tagColors,
  }));
  const colorIndex = tagId % tagColors.length;
  style = { ...style, backgroundColor: tagColors[colorIndex] };
  return (
    <span className="styled-tag" style={style}>
      {tagName}
    </span>
  );
};

export { BigTag, NoLinkTag };
export default Tag;
