import React from 'react';

const ChapterForm = ({
  activityDetail,
  inputHandler,
  chapterInput,
  filePath,
  inputFileHandler,
}) => {
  const { title, type } = activityDetail;
  console.log('ChapterForm - activityDetail', activityDetail);
  return (
    <div>
      <h3 className="no-margin">{title}</h3>
      <label htmlFor="subject">챕터 이름</label>
      <br />
      <input
        type="text"
        id="subject"
        name="subject"
        value={chapterInput.subject}
        onChange={(e) => inputHandler(e.target)}
      />
      <br />
      <label htmlFor="article">내용</label>
      <br />
      <input
        type="text"
        id="article"
        name="article"
        value={chapterInput.article}
        onChange={(e) => inputHandler(e.target)}
      />
      <br />
      <label htmlFor="inputFile">파일</label>
      <br />
      <input
        type="file"
        id="inputFile"
        name="inputFile"
        value={filePath}
        accept=".zip"
        onChange={(e) => inputFileHandler(e.target)}
      />
      <br />
    </div>
  );
};

export default ChapterForm;
