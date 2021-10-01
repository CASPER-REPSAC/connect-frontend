import React, { useState } from 'react';
import { ActivityForm } from './ActivityForm';
import WriteResponse from './WriteResponse';
import axios from 'axios';

const WriteActivity = () => {
  // states for write form
  const date = new Date().toISOString().substr(0, 10);
  const [inputs, setInputs] = useState({
    title: '',
    type: 'CTF',
    author: 'casper',
    createDate: date,
    description: '',
    startDate: date,
    endDate: date,
    currentState: 0,
    viewerNum: 0,
  });
  const [tags, setTags] = useState(['casper']);
  const [participants, setParticipants] = useState(['parti1']);

  // states for write response
  const [writeRes, setWriteRes] = useState(false);
  const [sendCounter, setSendCounter] = useState(0);
  const [resID, setResID] = useState(null);

  function submitActivity(inputs, tags, participants) {
    const data = {
      ...inputs,
      tags: tags,
      participants: participants,
    };
    setSendCounter(sendCounter + 1);
    axios
      .post('/api/', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        if (response['status'] === 201) {
          setWriteRes(true);
          setResID(response['data']['id']);
        }
      })
      .catch((error) => {
        console.log('err', error);
      });
  }

  return (
    <div>
      {sendCounter === 0 && (
        <ActivityForm
          inputs={inputs}
          setInputs={setInputs}
          tags={tags}
          setTags={setTags}
          participants={participants}
          setParticipants={setParticipants}
          submitActivity={submitActivity}
        ></ActivityForm>
      )}
      {sendCounter > 0 && (
        <WriteResponse
          res={writeRes}
          resID={resID}
          setSendCounter={setSendCounter}
        />
      )}
    </div>
  );
};

export default WriteActivity;
