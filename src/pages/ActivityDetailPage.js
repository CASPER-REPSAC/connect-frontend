import React, { useState, useEffect } from 'react';

import ActivityDetail from '../components/detail/ActivityDetail';
import { getActivityDetail, deleteActivity } from '../modules/api';
import { NoCards } from '../components/common/NoCards';

import Button from '../components/common/Button';
import { DeleteResponse, DeleteAsk } from '../components/write/WriteResponse';

const ActivityDetailPage = ({ match, history }) => {
  const { params } = match;

  const [activityDetail, setActivityDetail] = useState();
  const [getActivityRes, setGetActivityRes] = useState();
  const [deleteRes, setDeleteRes] = useState();
  const [deleteAsk, setDeleteAsk] = useState(false);
  const [sendCounter, setSendCounter] = useState(0);

  useEffect(() => {
    async function getActi() {
      const res = await getActivityDetail(params.activityId, setActivityDetail);
      setGetActivityRes(res);
      return;
    }
    getActi();
  }, [params]);

  const onDeleteActivity = () => {
    // deleteActivity = async (setWriteRes, activityId)
    console.log(params.activityId);
    setSendCounter(sendCounter + 1);
    deleteActivity(setDeleteRes, params.activityId);
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
    <>
      {getActivityRes === true && (
        <div className="d-flex flex-column justify-content-between h-100">
          {console.log(match)}
          {activityDetail && <ActivityDetail activityDetail={activityDetail} />}
          <div className="d-flex justify-content-between">
            <Button
              width="content-fit"
              onClick={() => {
                history.push(`/write/activities/${params.activityId}`);
              }}
            >
              챕터 작성
            </Button>
            <div>
              <Button
                width="content-fit"
                background="#8B0000"
                onClick={() => setDeleteAsk(true)}
              >
                액티비티 삭제
              </Button>
              <Button
                width="content-fit"
                style={{ marginLeft: '5px' }}
                onClick={() => {
                  history.push(`/write/activities/${params.activityId}/update`);
                }}
              >
                액티비티 수정
              </Button>
            </div>
          </div>
        </div>
      )}
      {getActivityRes === false && <NoCards msg="없는 페이지 입니다." />}
    </>
  );
};

export default React.memo(ActivityDetailPage);
