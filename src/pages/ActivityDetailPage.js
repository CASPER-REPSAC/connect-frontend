import React, { useState, useEffect } from 'react';

import ActivityDetail from '../components/detail/ActivityDetail';
import {
  getActivityDetail,
  submitActiParticipants,
  deleteActiParticipants,
} from '../modules/api';
import { NoCards } from '../components/common/NoCards';
import { useSelector } from 'react-redux';

import { Button, ManageButton } from '../components/common/Button';

const ActivityDetailPage = ({ match, history }) => {
  const { user } = useSelector((state) => ({ user: state.auth.user }));
  const { pk } = user;
  const { params } = match;

  const [activityDetail, setActivityDetail] = useState();
  const [getActivityRes, setGetActivityRes] = useState();
  const [deleteActiParti, setDeleteActiParti] = useState();

  useEffect(() => {
    async function getActi() {
      const res = await getActivityDetail(params.activityId, setActivityDetail);
      setGetActivityRes(res);
      return;
    }
    getActi();
  }, [params]);

  return (
    <>
      {getActivityRes === true && (
        <div className="d-flex flex-column justify-content-between h-100">
          {console.log(match)}

          {activityDetail && (
            <ActivityDetail
              activityDetail={activityDetail}
              ManageButton={ManageButton}
            />
          )}
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
                background="midnightblue"
                onClick={() => submitActiParticipants(params.activityId, pk)}
              >
                참가 신청
              </Button>
              <Button
                width="content-fit"
                style={{ marginLeft: '5px' }}
                onClick={() =>
                  deleteActiParticipants(
                    params.activityId,
                    pk,
                    setDeleteActiParti,
                  )
                }
              >
                탈퇴 신청
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
