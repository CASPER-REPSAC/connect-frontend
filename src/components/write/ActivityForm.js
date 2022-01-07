import React from 'react';
import { TagsInput } from 'react-tag-input-component';
import Button from '../common/Button';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// 참여자는 신청 페이지로 받기 -> 신청하면 작성자에게 알림.

const ActivityForm = ({
  inputs,
  setInputs,
  tags,
  setTags,
  submitActivity,
  manage,
}) => {
  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value });
  };
  const onDisChangeHandler = (value) => {
    setInputs({ ...inputs, description: value });
  };
  return (
    <div className="activity-form" style={{ maxWidth: '700px' }}>
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

      <CKEditor
        editor={ClassicEditor}
        data={inputs.description || ''}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
          onDisChangeHandler(data);
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
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
      {manage && (
        <>
          <br />
          <label htmlFor="currentState">
            <h5>Current State</h5>
          </label>
          <select
            name="currentState"
            id="currentState"
            value={inputs['currentState']}
            onChange={(e) => onChangeHandler(e)}
          >
            <option value="0">Plannded</option>
            <option value="1">Active</option>
            <option value="2">Ended</option>
          </select>
        </>
      )}
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

      <label htmlFor="title" className="mt-3">
        <h5>Password</h5>
      </label>

      <input
        type="password"
        id="password"
        className="d-block"
        style={{ width: '200px' }}
        value={inputs['password'] || ''}
        onChange={(e) => onChangeHandler(e)}
      />

      {!manage && (
        <>
          <br />
          <Button onClick={() => submitActivity()}>작성</Button>
          <br />
        </>
      )}
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
export default ActivityForm;
