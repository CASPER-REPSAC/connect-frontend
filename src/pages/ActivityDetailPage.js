import React, { useState, useEffect } from 'react';

import ActivityDetail from '../components/detail/ActivityDetail';
import {
  getActivityDetail,
  submitActiParticipants,
  deleteActiParticipants,
  getUserContainedList,
} from '../modules/api';
import { NoCards } from '../components/common/NoCards';
import { useSelector } from 'react-redux';
import { AskReqModal, AskPasswordModal } from '../components/common/ResModal';

import { Button, ManageButton } from '../components/common/Button';
import { useDispatch } from 'react-redux';
import { setContainedActivities } from '../modules/activities';

const ActivityDetailPage = ({ match, history }) => {
  const { user } = useSelector((state) => ({ user: state.auth.user }));
  const { pk } = user;
  const { params } = match;

  const dispatch = useDispatch();
  const getContainedActivities = (activities) => {
    dispatch(setContainedActivities(activities));
  };

  const [activityDetail, setActivityDetail] = useState();
  const [getActivityRes, setGetActivityRes] = useState();
  const [increaseReqTrigger, setincreaseReqTrigger] = useState(0);
  const [writeRes, setWriteRes] = useState();
  const initialReqModalState = {
    msg: '수정하시겠습니까?',
    onRequest: undefined,
    res: undefined,
    show: false,
    handleClose: undefined,
    onSuccess: undefined,
    msgSuccess: undefined,
    msgFail: undefined,
  };
  const initialPasswordModalState = {
    msg: undefined,
    onRequest: undefined,
    res: undefined,
    show: false,
    handleClose: undefined,
    onSuccess: undefined,
    msgSuccess: undefined,
    msgFail: undefined,
  };
  const [reqModal, setReqModal] = useState(initialReqModalState);
  const handleClose = () => {
    setReqModal({ ...reqModal, show: false });
  };

  useEffect(() => {
    setReqModal({ ...reqModal, res: writeRes });
  }, [writeRes]);

  async function onDeleteActiParticipants() {
    const onRequest = () => {
      deleteActiParticipants(params.activityId, pk, setWriteRes);
    };
    const onSuccess = () => {
      setincreaseReqTrigger(increaseReqTrigger + 1);
      getUserContainedList(user.access_token, getContainedActivities);
      setWriteRes(undefined);
    };
    setReqModal({
      ...initialReqModalState,
      handleClose: handleClose,
      res: writeRes,
      onRequest: onRequest,
      msg: '탈퇴하시겠습니까?',
      show: true,
      onSuccess: onSuccess,
      msgSuccess: '탈퇴하였습니다.',
      msgFail: '탈퇴하지 못했습니다.',
    });
  }

  async function onSubmitActiParticipants() {
    const onRequest = () => {
      submitActiParticipants(params.activityId, pk, setWriteRes);
    };
    const onSuccess = () => {
      setincreaseReqTrigger(increaseReqTrigger + 1);
      getUserContainedList(user.access_token, getContainedActivities);
      setWriteRes(undefined);
    };
    setReqModal({
      ...initialReqModalState,
      handleClose: handleClose,
      res: writeRes,
      onRequest: onRequest,
      msg: '참가하시겠습니까?',
      show: true,
      onSuccess: onSuccess,
      msgSuccess: '참가하었습니다.',
      msgFail: '참가하지 못했습니다.',
    });
  }

  useEffect(() => {
    async function getActi() {
      const res = await getActivityDetail(params.activityId, setActivityDetail);
      setGetActivityRes(res);
      return;
    }
    getActi();
  }, [params, increaseReqTrigger]);

  return (
    <>
      {getActivityRes === true && (
        <div className="d-flex flex-column justify-content-between h-100">
          {activityDetail && (
            <ActivityDetail
              activityDetail={activityDetail}
              ManageButton={ManageButton}
            />
          )}
          {user.email && (
            <div className="d-flex justify-content-end mt-3">
              {user.email && user.email !== activityDetail.author ? (
                <>
                  {activityDetail.participants
                    .map((participant) => participant.profile.email)
                    .includes(user.email) ? (
                    <>
                      {activityDetail.PW && (
                        <Button
                          background="midnightblue"
                          width="content-fit"
                          onClick={() => {
                            history.push(
                              `/write/activities/${params.activityId}`,
                            );
                          }}
                        >
                          챕터 작성
                        </Button>
                      )}
                      <Button
                        width="content-fit"
                        style={{ marginLeft: '5px' }}
                        background="#8B0000"
                        onClick={() => onDeleteActiParticipants()}
                      >
                        탈퇴 신청
                      </Button>
                    </>
                  ) : (
                    <Button
                      width="content-fit"
                      background="midnightblue"
                      onClick={() => onSubmitActiParticipants()}
                    >
                      참가 신청
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button
                    background="midnightblue"
                    width="content-fit"
                    onClick={() => {
                      history.push(`/write/activities/${params.activityId}`);
                    }}
                  >
                    챕터 작성
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      )}
      {getActivityRes === undefined && <NoCards msg="로딩 중..." />}
      {getActivityRes === false && <NoCards msg="없는 페이지 입니다." />}
      <AskReqModal
        show={reqModal.show}
        handleClose={reqModal.handleClose}
        msg={reqModal.msg}
        msgSuccess={reqModal.msgSuccess}
        msgFail={reqModal.msgFail}
        onRequest={reqModal.onRequest}
        res={reqModal.res}
        onSuccess={reqModal.onSuccess}
      />
    </>
  );
};

export default React.memo(ActivityDetailPage);
