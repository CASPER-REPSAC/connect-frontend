import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TagsInput } from 'react-tag-input-component';
import Button from '../common/Button';

// 참여자는 신청 페이지로 받기 -> 신청하면 작성자에게 알림.

const ActivityForm = ({
  inputs,
  setInputs,
  tags,
  setTags,
  participants,
  setParticipants,
  submitActivity,
}) => {
  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value });
  };

  return (
    <div className="activity-form" style={{ maxWidth: '500px' }}>
      <h4>액티비티 작성</h4>
      <hr />
      <label htmlFor="title" className="no-margin">
        <h5>Title</h5>
      </label>
      <input
        type="text"
        id="title"
        value={inputs['title']}
        onChange={(e) => onChangeHandler(e)}
      />
      <label htmlFor="description">
        <h5>Description</h5>
      </label>
      <input
        type="text"
        id="description"
        value={inputs['description']}
        onChange={(e) => onChangeHandler(e)}
      />

      <label htmlFor="type">
        <h5>Type</h5>
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
      <div className="date">
        <h5 className="mt-3">Date</h5>
        <label htmlFor="startDate">start date</label>
        <input
          type="date"
          id="startDate"
          value={inputs['startDate']}
          onChange={(e) => onChangeHandler(e)}
        />
        <label htmlFor="endDate">end date</label>
        <input
          type="date"
          id="endDate"
          value={inputs['endDate']}
          onChange={(e) => onChangeHandler(e)}
        />
      </div>
      <h5 className="mt-3">Tags</h5>
      <TagsInput
        value={tags}
        onChange={setTags}
        name="tags"
        placeHolder="태그를 입력해주세요"
      />

      <br />
      <Button onClick={() => submitActivity()}>작성</Button>
      <br />
    </div>
  );
};

/*
<label htmlFor="participants">
  <h5>Participants</h5>
</label>
<TagsInput
  value={participants}
  onChange={setParticipants}
  name="participants"
  placeHolder="참가자를 입력해주세요"
/>
*/

export { ActivityForm };
