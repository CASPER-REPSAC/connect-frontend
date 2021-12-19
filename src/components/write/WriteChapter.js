import React, { useState, useEffect } from 'react';
import ChapterForm from './ChapterForm';
import {
  getActivityDetail,
  submitChapter,
  uploadChapterFile,
  uploadChapterFiles,
} from '../../modules/api';
import FileUploadTest from './FileUploadTest';
import { WriteChapterResponse } from './WriteResponse';

const WriteChapter = ({ match }) => {
  const [formDatas, setFormDatas] = useState([]);
  const [activityDetail, setActivityDetail] = useState();
  const [chapterInput, setChapterInput] = useState({
    subject: '',
    article: '',
    activityid: match.params.id,
    files: [],
  });
  const [targetFiles, setTargetFiles] = useState();

  // states for write response
  const [writeRes, setWriteRes] = useState(false);
  const [fileRes, setFileRes] = useState(false);
  const [sendCounter, setSendCounter] = useState(0);
  const [resID, setResID] = useState(null);
  const [fileFail, setFileFail] = useState([]);

  // console.log(match);
  useEffect(() => {
    if (match.params.activityId) {
      getActivityDetail(match.params.activityId, setActivityDetail);
      setChapterInput({ ...chapterInput, activityid: match.params.activityId });
    }
  }, [match]);

  const inputHandler = (target) => {
    setChapterInput({
      ...chapterInput,
      [target.name]: target.value,
    });
  };

  const onFileChange = ({ target }) => {
    setChapterInput({
      ...chapterInput,
      files: Array.from(target.files),
    });

    setTargetFiles(target.files);
  };

  const onSubmitChapter = async () => {
    const data = {
      subject: chapterInput.subject,
      article: chapterInput.article,
      activityid: chapterInput.activityid,
    };
    setSendCounter(sendCounter + 1);
    const res = await submitChapter(data, match.params.activityId, setWriteRes);
    console.log(res);
    setResID(res);
    if (targetFiles) {
      const fileUploadRes = await uploadChapterFiles(
        targetFiles,
        match.params.activityId,
        res,
      );

      console.log('fileUploadRes', fileUploadRes);
      if (fileUploadRes[0] !== targetFiles.length) {
        setFileRes(false);
        setFileFail(fileUploadRes[1]);
      } else {
        setFileRes(true);
      }
    } else {
      setFileRes(true);
    }
  };

  return (
    <>
      {activityDetail ? (
        <>
          {sendCounter === 0 && (
            <ChapterForm
              activityDetail={activityDetail}
              chapterInput={chapterInput}
              inputHandler={inputHandler}
              onFileChange={onFileChange}
              submitChapter={onSubmitChapter}
            />
          )}
          {sendCounter > 0 && (
            <WriteChapterResponse
              res={writeRes}
              resID={resID}
              fileFail={fileFail}
              fileRes={fileRes}
              setSendCounter={setSendCounter}
              submitChapter={onSubmitChapter}
              activityId={chapterInput.activityid}
            />
          )}
        </>
      ) : (
        <>
          <small className="text-muted">액티비티 불러오는 중..</small>
        </>
      )}
      {/* <FileUploadTest match={match} /> */}
    </>
  );
};

export default WriteChapter;
