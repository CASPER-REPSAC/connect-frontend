import React, { useState, useEffect } from 'react';
import {
  updateActivity,
  deleteActivity,
  getUserContainedList,
} from 'modules/api';
import { AskReqModal } from 'components/common/ResModal';
import Button from 'components/common/Button';
import ManageParticipants from './ManageParticipants';
import ActivityForm from 'components/write/ActivityForm';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setContainedActivities } from 'modules/activities';

const ManageActivity = ({
  match,
  history,
  activityDetail,
  prevTags,
  prevParticipants,
}) => {
  const { params } = match;
  const dispatch = useDispatch();
  const getContainedActivities = (activities) => {
    dispatch(setContainedActivities(activities));
  };
  const { user } = useSelector((state) => ({ user: state.auth.user }));

  // states for write form
  const [inputs, setInputs] = useState({
    title: activityDetail.title,
    type: activityDetail.type,
    // createDate: activityDetail.createDate,
    description: activityDetail.description,
    startDate: activityDetail.startDate,
    endDate: activityDetail.endDate,
    currentState: activityDetail.currentState,
  });
  const [tags, setTags] = useState(prevTags);
  const [participantsDelete, setParticipantsDelete] = useState([]);
  const [reqModal, setReqModal] = useState({
    msg: '수정하시겠습니까?',
    onRequest: undefined,
    res: undefined,
    show: false,
    handleClose: undefined,
    onSuccess: undefined,
  });

  const handleClose = () => {
    setReqModal({ ...reqModal, show: false });
  };

  // states for write response
  const [writeRes, setWriteRes] = useState(undefined);

  const onClickParticipants = (participantName) => {
    if (!participantsDelete.includes(participantName)) {
      setParticipantsDelete([...participantsDelete, participantName]);
    } else {
      setParticipantsDelete([
        ...participantsDelete.filter(
          (prevParti) => prevParti !== participantName,
        ),
      ]);
    }
  };

  async function onSubmitActivity() {
    const data = {
      ...inputs,
      tags: tags,
      participants_delete: participantsDelete,
    };

    const onRequest = () => {
      updateActivity(data, setWriteRes, params.activityId);
    };
    const onSuccess = () => {
      history.go(-1);
      getUserContainedList(user.access_token, getContainedActivities);
    };
    setReqModal({
      ...reqModal,
      handleClose: handleClose,
      res: writeRes,
      onRequest: onRequest,
      msg: '수정하시겠습니까?',
      show: true,
      onSuccess: onSuccess,
      msgSuccess: '수정하였습니다.',
      msgFail: '수정하지 못했습니다.',
    });
  }

  useEffect(() => {
    setReqModal({ ...reqModal, res: writeRes });
  }, [writeRes]);

  async function onDeleteActivity() {
    const onRequest = () => {
      deleteActivity(setWriteRes, params.activityId);
    };
    const onSuccess = () => {
      getUserContainedList(user.access_token, getContainedActivities);

      history.push('/main');
    };
    setReqModal({
      ...reqModal,
      handleClose: handleClose,
      res: writeRes,
      onRequest: onRequest,
      msg: '삭제하시겠습니까?',
      show: true,
      onSuccess: onSuccess,
      msgSuccess: '삭제하였습니다.',
      msgFail: '삭제하지 못했습니다.',
    });
  }

  return (
    <>
      <ActivityForm
        inputs={inputs}
        setInputs={setInputs}
        tags={tags}
        setTags={setTags}
        submitActivity={onSubmitActivity}
        manage
      />
      {Array.isArray(prevParticipants) && prevParticipants.length > 0 && (
        <ManageParticipants
          currentParticipants={prevParticipants}
          onClickParticipants={onClickParticipants}
          participantsDelete={participantsDelete}
        />
      )}
      <div className="d-flex justify-content-between mt-3">
        <Button background="#8B0000" onClick={() => onDeleteActivity()}>
          액티비티 삭제
        </Button>
        <Button onClick={() => onSubmitActivity()}>액티비티 수정</Button>
      </div>
      {/* handleClose, msg, msgSuccess, msgFail, onRequest, res, */}
      <AskReqModal
        show={reqModal.show}
        handleClose={reqModal.handleClose}
        msg={reqModal.msg}
        onRequest={reqModal.onRequest}
        res={reqModal.res}
        onSuccess={reqModal.onSuccess}
        msgSuccess={reqModal.msgSuccess}
        msgFail={reqModal.msgFail}
      />
    </>
  );
};

export default ManageActivity;
