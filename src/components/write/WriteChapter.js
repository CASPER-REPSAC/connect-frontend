import React, { useState, useEffect } from 'react';
import ChapterForm from './ChapterForm';
import {
  getActivityDetail,
  submitChapter,
  uploadChapterFiles,
} from '../../modules/api';
import { WriteChapterResponse } from './WriteResponse';

const WriteChapter = ({ match }) => {
  const [activityDetail, setActivityDetail] = useState();
  const [chapterInput, setChapterInput] = useState({
    subject: '',
    article: '',
    activityid: match.params.id,
    password: '',
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
  const inputDiscriptionHandler = (value) => {
    setChapterInput({
      ...chapterInput,
      article: value,
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
      password: chapterInput.password,
    };
    setSendCounter(sendCounter + 1);
    const res = await submitChapter(data, match.params.activityId, setWriteRes);
    setResID(res);
    if (targetFiles) {
      const fileUploadRes = await uploadChapterFiles(
        targetFiles,
        match.params.activityId,
        res,
      );

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
            <>
              <h4 className="no-margin">챕터 작성: {activityDetail.title} </h4>
              <hr />
              <ChapterForm
                activityDetail={activityDetail}
                chapterInput={chapterInput}
                inputHandler={inputHandler}
                onFileChange={onFileChange}
                submitChapter={onSubmitChapter}
                targetFiles={targetFiles}
                inputDiscriptionHandler={inputDiscriptionHandler}
                match={match}
              />
            </>
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
