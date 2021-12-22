import React, { useState, useEffect } from 'react';
import { ActivityForm } from './ActivityForm';
import WriteResponse from './WriteResponse';
import { updateActivity } from '../../modules/api';

const UpdateActivity = ({ match, activityDetail, prevTags }) => {
  const { params } = match;

  console.log('match', match);
  // states for write form
  const [inputs, setInputs] = useState({
    title: activityDetail.title,
    type: activityDetail.type,
    author: 'casper',
    createDate: activityDetail.createDate,
    description: activityDetail.description,
    startDate: activityDetail.startDate,
    endDate: activityDetail.endDate,
    currentState: activityDetail.currentState,
  });
  const [tags, setTags] = useState(prevTags);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    console.log('tags', tags);
  }, [tags]);

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
    console.log('write data', data);
  }

  return (
    <div>
      {/* {console.log(tags)} */}
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
          <WriteResponse
            res={writeRes}
            resID={resID}
            setSendCounter={setSendCounter}
            submitActivity={onSubmitActivity}
          />
        )}
      </>
    </div>
  );
};

export default UpdateActivity;
