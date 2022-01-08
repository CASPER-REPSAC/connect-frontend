import React, { useState, useEffect } from 'react';
import { ActivityForm } from './ActivityForm';
import { UpdateResponse } from './WriteResponse';
import { updateActivity } from '../../modules/api';
import { useSelector } from 'react-redux';

const UpdateActivity = ({ match, activityDetail, prevTags }) => {
  const { params } = match;
  const { user } = useSelector((state) => ({ user: state.auth.user }));
  const { pk } = user;

  // states for write form
  const [inputs, setInputs] = useState({
    title: activityDetail.title,
    type: activityDetail.type,
    // author: 'casper',
    createDate: activityDetail.createDate,
    description: activityDetail.description,
    startDate: activityDetail.startDate,
    endDate: activityDetail.endDate,
    currentState: activityDetail.currentState,
  });
  const [tags, setTags] = useState(prevTags);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {}, [tags]);

  useEffect(() => {
    setInputs({ ...inputs, author: pk });
  }, [user]);

  // states for write response
  const [writeRes, setWriteRes] = useState(false);
  const [sendCounter, setSendCounter] = useState(0);
  const [resID, setResID] = useState(null);

  async function onSubmitActivity() {
    const data = {
      ...inputs,
      tags: tags,
      participants: participants,
    };
    updateActivity(data, setWriteRes, setResID, params.activityId);
    setSendCounter(sendCounter + 1);
  }

  return (
    <>
      <>
        {inputs && sendCounter === 0 && (
          <>
            <h4>액티비티 수정</h4>
            <hr />
            <ActivityForm
              inputs={inputs}
              setInputs={setInputs}
              tags={tags}
              setTags={setTags}
              participants={participants}
              setParticipants={setParticipants}
              submitActivity={onSubmitActivity}
            ></ActivityForm>
          </>
        )}
        {sendCounter > 0 && (
          <UpdateResponse
            res={writeRes}
            resID={resID}
            setSendCounter={setSendCounter}
            submitActivity={onSubmitActivity}
          />
        )}
      </>
    </>
  );
};

export default UpdateActivity;
