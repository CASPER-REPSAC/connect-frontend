import React, { useState, useEffect } from 'react';
import { updateActivity } from '../../modules/api';
import { AskReqModal } from '../common/ResModal';
import Button from '../common/Button';
import ManageParticipants from './ManageParticipants';
import { deleteActivity } from '../../modules/api';
import ActivityForm from '../write/ActivityForm';

const ManageActivity = ({
  match,
  history,
  activityDetail,
  prevTags,
  prevParticipants,
}) => {
  const { params } = match;

  console.log('match', match);
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
  const [sendCounter, setSendCounter] = useState(0);

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
    console.log('submit');

    const onRequest = () => {
      console.log('submit request');
      updateActivity(data, setWriteRes, params.activityId);
    };
    const onSuccess = () => {
      history.go(-1);
    };
    setReqModal({
      ...reqModal,
      handleClose: handleClose,
      res: writeRes,
      onRequest: onRequest,
      msg: '수정하시겠습니까?',
      show: true,
      onSuccess: onSuccess,
    });
  }

  useEffect(() => {
    setReqModal({ ...reqModal, res: writeRes });
  }, [writeRes]);

  async function onDeleteActivity() {
    console.log('delete');
    const onRequest = () => {
      console.log('delete request');
      deleteActivity(setWriteRes, params.activityId);
    };
    const onSuccess = () => {
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
      {console.log('tags', tags)}
      {Array.isArray(prevParticipants) && prevParticipants.length > 0 && (
        <ManageParticipants
          currentParticipants={prevParticipants}
          onClickParticipants={onClickParticipants}
          participantsDelete={participantsDelete}
        />
      )}
      <div className="d-flex justify-content-between mt-3">
        <Button onClick={() => onDeleteActivity()}>액티비티 삭제</Button>
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
      />
    </>
  );
};

export default ManageActivity;
