import React, { useState, useEffect } from 'react';
import { ActivityForm } from './ActivityForm';
import WriteResponse from './WriteResponse';
import { submitActivity, submitActiParticipants } from '../../modules/api';
import { useSelector } from 'react-redux';

const WriteActivity = () => {
  // states for write form
  const date = new Date().toISOString().substr(0, 10);
  const { user } = useSelector((state) => ({ user: state.auth.user }));
  const { pk } = user;

  const [inputs, setInputs] = useState({
    title: '',
    type: 'CTF',
    author: '',
    createDate: date,
    description: '',
    startDate: date,
    endDate: date,
    currentState: 0,
    password: '',
  });
  const [tags, setTags] = useState([]);
  const [participants, setParticipants] = useState([]);

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
    submitActivity(data, setWriteRes, setResID);
    setSendCounter(sendCounter + 1);
    console.log('write data', data);
  }

  return (
    <>
      {/* {console.log(tags)} */}
      {sendCounter === 0 && (
        <>
          <h4>액티비티 작성</h4>
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
        <WriteResponse
          res={writeRes}
          resID={resID}
          setSendCounter={setSendCounter}
          submitActivity={onSubmitActivity}
        />
      )}
    </>
  );
};

export default WriteActivity;
