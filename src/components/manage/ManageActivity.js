import React, { useState, useEffect } from 'react';
import { updateActivity } from '../../modules/api';
import { ResSuccessModal, ResFailModal } from '../common/ResModal';
import Button from '../common/Button';
import ManageParticipants from './ManageParticipants';
import { deleteActiParticipants } from '../../modules/api';
import ActivityForm from '../write/ActivityForm';

const ManageActivity = ({
  match,
  activityDetail,
  prevTags,
  prevParticipants,
}) => {
  const { params } = match;
  const [show, setShow] = useState(false);

  console.log('match', match);
  // states for write form
  const [inputs, setInputs] = useState({
    title: activityDetail.title,
    type: activityDetail.type,
    createDate: activityDetail.createDate,
    description: activityDetail.description,
    startDate: activityDetail.startDate,
    endDate: activityDetail.endDate,
    currentState: activityDetail.currentState,
  });
  const [tags, setTags] = useState(prevTags);
  const [participantsDelete, setParticipantsDelete] = useState([]);

  // states for write response
  const [writeRes, setWriteRes] = useState(false);
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

    updateActivity(data, setWriteRes, params.activityId);
    setSendCounter(sendCounter + 1);
    console.log('write data', data);
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
        <Button>액티비티 삭제</Button>
        <Button>액티비티 수정</Button>
      </div>
    </>
  );
};

export default ManageActivity;
