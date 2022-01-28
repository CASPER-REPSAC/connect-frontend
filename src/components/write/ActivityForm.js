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
        <h5 className="needed">Title</h5>
      </label>
      <input
        type="text"
        id="title"
        value={inputs['title']}
        onChange={(e) => onChangeHandler(e)}
      />
      <label htmlFor="description">
        <h5 className="needed">Description</h5>
      </label>

      <CKEditor
        editor={ClassicEditor}
        data={inputs.description || ''}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onDisChangeHandler(data);
        }}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
      />

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
      <div className="d-flex">
        <div>
          <label htmlFor="type">
            <h5 className="needed">Type</h5>
          </label>
          <br />
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
        </div>

        <div className="date">
          <h5 className="mt-3 needed">Date</h5>
          <div className="d-flex">
            <div>
              <label htmlFor="startDate">start</label>
              <input
                type="date"
                id="startDate"
                value={inputs['startDate']}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div>
              <label htmlFor="endDate">end</label>
              <input
                type="date"
                id="endDate"
                value={inputs['endDate']}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
          </div>
        </div>
      </div>
      <h5 className="mt-3">Tags</h5>
      <TagsInput
        value={tags}
        onChange={setTags}
        name="tags"
        placeHolder="태그를 입력해주세요"
      />

      <label htmlFor="authString" className="mt-3 d-flex">
        <h5 className="pw-label">Password</h5>
        <div
          className="d-flex align-items-center"
          style={{
            fontSize: '10px',
            lineHeight: '-100%',
            marginLeft: '10px',
          }}
        >
          <div
            style={{
              color: 'blue',
            }}
          >
            *
          </div>
          <div
            style={{
              color: 'blue',
              marginLeft: '5px',
            }}
          >
            선택사항. <br /> 참여자가 챕터를 작성할 때 필요합니다.
          </div>
        </div>
      </label>

      <input
        type="password"
        id="authString"
        className="d-block"
        style={{ width: '200px' }}
        value={inputs['authString'] || ''}
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
