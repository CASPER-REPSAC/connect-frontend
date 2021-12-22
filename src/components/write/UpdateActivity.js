import React, { useState, useEffect } from 'react';
import { ActivityForm } from './ActivityForm';
import WriteResponse from './WriteResponse';
import { updateActivity, getActivityDetail } from '../../modules/api';

const UpdateActivity = ({ match }) => {
  const { params } = match;
  const [activityDetail, setActivityDetail] = useState();

  useEffect(() => {
    if (match.params.activityId) {
      getActivityDetail(match.params.activityId, setActivityDetail);
    }
  }, [match]);

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
  const [tags, setTags] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    console.log('activityDetail', activityDetail);
    if (activityDetail) {
      setInputs({
        title: activityDetail.title,
        type: activityDetail.type,
        author: 'casper',
        createDate: activityDetail.createDate,
        description: activityDetail.description,
        startDate: activityDetail.startDate,
        endDate: activityDetail.endDate,
        currentState: activityDetail.currentState,
      });
      setTags((prev) => activityDetail.tags.map((tag) => tag.tag_name));
    }
  }, [activityDetail]);

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
    updateActivity(data, setWriteRes, setResID, params.activiyId);
    setSendCounter(sendCounter + 1);
    console.log('write data', data);
  }

  return (
    <div>
      {/* {console.log(tags)} */}
      {activityDetail ? (
        <>
          {sendCounter === 0 && (
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
      ) : (
        <>
          <small className="text-muted">액티비티 불러오는 중..</small>
        </>
      )}
    </div>
  );
};

export default UpdateActivity;
