import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import './CardItem.scss';

const ChapterCardItem = ({ card, colors }) => {
  const { subject, article, chapterid, activityid } = card;
  let url = `/activities/${activityid}/chapter/${chapterid}`;

  return (
    <div className="chapter-card-item-block">
      <div>
        <div className="article-header">
          <Link to={url}>
            <div title={subject || 'no subject'} className="title dragable">
              {subject || 'no subject'}
            </div>
          </Link>
        </div>
        <Link to={url}>
          <div className="introduce dragable" title={article || 'no article'}>
            {article || 'no article'}
          </div>
        </Link>
      </div>
      <div className="d-flex justify-content-end">
        <div className="card-type">chapter</div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    colors: state.colors,
  }),
  {},
)(ChapterCardItem);
