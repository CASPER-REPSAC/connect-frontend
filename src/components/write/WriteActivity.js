import React, { useState } from 'react';
import { ActivityForm } from './ActivityForm';
import WriteResponse from './WriteResponse';
import { submitActivity } from '../../modules/api';

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
    <div>
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
    </div>
  );
};

export default WriteActivity;
