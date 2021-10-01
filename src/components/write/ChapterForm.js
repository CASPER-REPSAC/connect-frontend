import React from 'react';

const ChapterForm = ({
  activityTitle,
  activityId,
  chapterId,
  subject,
  article,
}) => {
  return (
    <div>
      <h3 className="no-margin">
        {activityTitle}-{activityId}
      </h3>
      <p>chpaterId={chapterId && chapterId}</p>
      <label htmlFor="subject">
        <p className="no-margin">subject</p>
      </label>
      <input type="text" id="subject" />
      <label htmlFor="article">
        <p className="no-margin">article</p>
      </label>
      <input type="text" id="article" />
    </div>
  );
};

export default ChapterForm;
