import React, { useEffect, useState } from 'react';
import ChapterDetail from '../components/detail/ChapterDetail';
import { getListData, deleteChapter } from '../modules/api';
import { NoCards } from '../components/common/NoCards';

import Button from '../components/common/Button';
import Comment from '../components/common/Comment';
import { DeleteResponse, DeleteAsk } from '../components/write/WriteResponse';
import { useSelector } from 'react-redux';

const ActivityChapterPage = ({ match, history }) => {
  // console.log('ActivityChapterPage match', match);
  const { user } = useSelector((state) => ({ user: state.auth.user }));

  const { params } = match;
  const [chapterData, setChapterData] = useState();
  const [deleteRes, setDeleteRes] = useState();
  const [deleteAsk, setDeleteAsk] = useState(false);
  const [sendCounter, setSendCounter] = useState(0);
  const [reqTrigger, setReqTrigger] = useState(0);

  useEffect(() => {
    getListData(`/api${match.url}/`, setChapterData);
  }, [match, reqTrigger]);
  const increateReqTrigger = () => {
    setReqTrigger(reqTrigger + 1);
  };

  const onDeleteActivity = async () => {
    // deleteChapter(activityId, setWriteRes, chapterId)
    // console.log(params.activityId);
    setSendCounter(sendCounter + 1);
    await deleteChapter(params.activityId, setDeleteRes, params.chapterId);
  };

  if (sendCounter !== 0) {
    return (
      <>
        <DeleteResponse
          res={deleteRes}
          setSendCounter={setSendCounter}
          submitActivity={onDeleteActivity}
        />
      </>
    );
  }
  if (deleteAsk === true) {
    // setDeleteAsk, onDeleteActivity
    return (
      <>
        <DeleteAsk
          setDeleteAsk={setDeleteAsk}
          onDeleteActivity={onDeleteActivity}
        />
      </>
    );
  }

  return (
    <div className="activity-chapter-page">
      {/* {console.log('activityChapterDetail', chapterData)} */}
      {chapterData ? (
        <>
          <ChapterDetail chapterData={chapterData} match={match} />
          {user.email && (
            <div className="d-flex justify-content-between">
              <Button
                width="content-fit"
                background="#8B0000"
                style={{ marginLeft: '5px' }}
                onClick={() => setDeleteAsk(true)}
              >
                챕터 삭제
              </Button>
              <Button
                width="content-fit"
                style={{ marginLeft: '5px' }}
                onClick={() => {
                  history.push(
                    `/write/activities/${params.activityId}/chapter/${params.chapterId}/update`,
                  );
                }}
              >
                챕터 수정
              </Button>
            </div>
          )}

          {chapterData[2].length < 1 && !user.email ? (
            <></>
          ) : (
            <Comment
              increateReqTrigger={increateReqTrigger}
              activityId={params.activityId}
              chapterId={params.chapterId}
              comments={chapterData[2]}
            />
          )}
        </>
      ) : (
        <NoCards msg="없는 페이지 입니다." />
      )}
    </div>
  );
};

export default ActivityChapterPage;
