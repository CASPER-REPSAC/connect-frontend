import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TagsInput } from 'react-tag-input-component';
import Button from '../common/Button';

function submitActivity(inputs, tags, participants) {
  const data = {
    ...inputs,
    tags: tags,
    participants: participants,
  };
  console.log('fail', data);
  axios
    .post('/api/', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('err', error);
    });
}

const ActivityForm = () => {
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

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value });
  };

  return (
    <div className="activityForm" style={{ maxWidth: '500px' }}>
      <label htmlFor="title">
        <h3 className="no-margin">Title</h3>
      </label>
      <input
        type="text"
        id="title"
        value={inputs['title']}
        onChange={(e) => onChangeHandler(e)}
      />
      <label htmlFor="description">
        <h3>Description</h3>
      </label>
      <input
        type="text"
        id="description"
        value={inputs['description']}
        onChange={(e) => onChangeHandler(e)}
      />

      <label htmlFor="type">
        <h3>Type</h3>
      </label>
      <select
        name="type"
        id="type"
        value={inputs['type']}
        onChange={(e) => onChangeHandler(e)}
      >
        <option value="CTF">CTF</option>
        <option value="Study">Study</option>
        <option value="Project">Project</option>
      </select>
      <h3>Date</h3>
      <div>
        <label htmlFor="startDate">start date</label>
        <input
          type="date"
          id="startDate"
          value={inputs['startDate']}
          onChange={(e) => onChangeHandler(e)}
        />
      </div>
      <div>
        <label htmlFor="endDate">end date</label>
        <input
          type="date"
          id="endDate"
          value={inputs['endDate']}
          onChange={(e) => onChangeHandler(e)}
        />
      </div>
      <h3>Tags</h3>
      <TagsInput
        value={tags}
        onChange={setTags}
        name="tags"
        placeHolder="태그를 입력해주세요"
      />
      <label htmlFor="participants">
        <h3>Participants</h3>
      </label>
      <TagsInput
        value={participants}
        onChange={setParticipants}
        name="participants"
        placeHolder="참가자를 입력해주세요"
      />
      <br />
      <Button onClick={() => submitActivity(inputs, tags, participants)}>
        제출
      </Button>
      <br />
    </div>
  );
};

export { ActivityForm };
