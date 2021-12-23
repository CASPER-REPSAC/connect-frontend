import React, { useState, useEffect } from 'react';
import ChapterForm from './ChapterForm';
import {
  getActivityDetail,
  updateChapter,
  uploadChapterFiles,
} from '../../modules/api';
import { UpdateResponse } from './WriteResponse';
import { getListData } from '../../modules/api';
import { NoCards } from '../common/NoCards';

const UpdateChapter = ({ match }) => {
  const [chapterData, setChapterData] = useState();
  const { params } = match;

  useEffect(() => {
    getListData(
      `/api/activities/${params.activityId}/chapter/${params.chapterId}/`,
      setChapterData,
    );
  }, [match]);

  console.log('chapterData', chapterData);

  const [activityDetail, setActivityDetail] = useState();
  const [chapterInput, setChapterInput] = useState({
    subject: '',
    article: '',
    activityid: match.params.id,
    files: [],
    file_delete: [],
    current_files: [],
  });
  const [targetFiles, setTargetFiles] = useState();

  useEffect(() => {
    if (chapterData) {
      setChapterInput({
        ...chapterInput,
        subject: chapterData[0].subject,
        article: chapterData[0].article,
        activityid: chapterData[0].activityid,
        current_files: chapterData[1],
      });
    }
  }, [chapterData]);

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

  const onFileDelete = (filepath) => {
    setChapterInput({
      ...chapterInput,
      file_delete: [...chapterInput.file_delete, filepath],
    });
  };

  const onFileUnDelete = (filepath) => {
    setChapterInput({
      ...chapterInput,
      file_delete: chapterInput.file_delete.filter((file) => file !== filepath),
    });
  };

  const onSubmitChapter = async () => {
    const data = {
      subject: chapterInput.subject,
      article: chapterInput.article,
      activityid: chapterInput.activityid,
      file_delete: chapterInput.file_delete,
    };
    setSendCounter(sendCounter + 1);
    console.log('updaeteadf', data);
    const res = await updateChapter(
      data,
      match.params.activityId,
      setWriteRes,
      match.params.chapterId,
    );

    console.log(res);
    setResID(res);
    if (targetFiles) {
      const fileUploadRes = await uploadChapterFiles(
        targetFiles,
        match.params.activityId,
        match.params.chapterId,
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

  if (!chapterData) {
    return <NoCards msg="없는 페이지 입니다." />;
  }

  return (
    <>
      {activityDetail ? (
        <>
          {sendCounter === 0 && (
            <>
              <h4 className="no-margin">챕터 수정: {activityDetail.title} </h4>
              <hr />
              <ChapterForm
                activityDetail={activityDetail}
                chapterInput={chapterInput}
                inputHandler={inputHandler}
                onFileChange={onFileChange}
                submitChapter={onSubmitChapter}
                update
                onFileDelete={onFileDelete}
                onFileUnDelete={onFileUnDelete}
                targetFiles={targetFiles}
              />
            </>
          )}
          {sendCounter > 0 && (
            <UpdateResponse
              res={writeRes}
              resID={resID}
              fileFail={fileFail}
              fileRes={fileRes}
              setSendCounter={setSendCounter}
              submitChapter={onSubmitChapter}
              activityId={chapterInput.activityid}
              submitActivity={onSubmitChapter}
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

export default UpdateChapter;
