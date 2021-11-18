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
  });
  const [tags, setTags] = useState(['casper']);
  const [participants, setParticipants] = useState([]);

  // states for write response
  const [writeRes, setWriteRes] = useState(false);
  const [sendCounter, setSendCounter] = useState(0);
  const [resID, setResID] = useState(null);

  async function submitActivity(inputs, tags, participants) {
    const data = {
      ...inputs,
      tags: tags,
      participants: participants,
    };
    setSendCounter(sendCounter + 1);
    console.log('write data', data);
    await axios
      .post('/api/activities/', data, {
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
      {/* {console.log(tags)} */}
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
