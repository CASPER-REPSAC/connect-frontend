import React, { useState, useEffect } from 'react';
import ChapterForm from './ChapterForm';
import { getActivityDetail, submitChapter } from '../../modules/api';
import FileUploadTest from './FileUploadTest';

const WriteChapter = ({ match }) => {
  const [activityDetail, setActivityDetail] = useState();
  const [chapterInput, setChapterInput] = useState({
    subject: 'file upload test',
    article: 'file upload test',
    activityid: match.params.id,
  });
  const [filePath, setFilePath] = useState('');
  const [fileBlob, setFileBlob] = useState();

  useEffect(() => {
    getActivityDetail(match.params.id, setActivityDetail);
  }, [match]);

  const inputHandler = (target) => {
    setChapterInput({
      ...chapterInput,
      [target.name]: target.value,
    });
  };

  const inputFileHandler = (target) => {
    setFilePath(target.value);
    setFileBlob(target.files[0]);
  };

  return (
    <>
      {activityDetail && (
        <ChapterForm
          activityDetail={activityDetail}
          chapterInput={chapterInput}
          inputHandler={inputHandler}
          filePath={filePath}
          inputFileHandler={inputFileHandler}
        />
      )}
      <button onClick={() => submitChapter(chapterInput, filePath, fileBlob)}>
        제출
      </button>
      <FileUploadTest match={match} />
    </>
  );
};

export default WriteChapter;
