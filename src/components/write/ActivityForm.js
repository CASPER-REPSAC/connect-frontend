import React, { useCallback, useState, useEffect } from "react";
import { ClassicCKEditor } from "./ClassicCKEditor";
import { changeActivityInput } from "@/redux/inputs";
import { useDispatch, useSelector } from "react-redux";
import { WithContext as ReactTags } from "react-tag-input";
import "./forms.css";

const TagInput = ({ onChange, prevTags }) => {
  const [tags, setTags] = useState([]);
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  useEffect(() => {
    setTags(prevTags.map((tag) => ({ id: tag, text: tag })));
  }, []);

  useEffect(() => {
    onChange({ target: { name: "tags", value: tags.map((tag) => tag.text) } });
  }, [tags, onChange]);

  return (
    <ReactTags
      tags={tags}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      inputFieldPosition="top"
      placeholder="태그 입력 후 enter"
      allowDragDrop={false}
    />
  );
};

const SelectType = React.memo(({ type, onChange }) => {
  return (
    <select
      name="type"
      id="type"
      className=" connect-input col-start-1 col-end-2 row-start-1 row-end-2"
      value={type || ""}
      onChange={(e) => {
        onChange(e);
      }}
    >
      <option value="Project">Project</option>
      <option value="Study">Study</option>
      <option value="CTF">CTF</option>
    </select>
  );
});

const SelectCurrentState = ({ currentState, onChange }) => {
  return (
    <select
      name="currentState"
      id="currentState"
      className="connect-input col-start-1 col-end-2 row-start-1 row-end-2"
      value={currentState}
      onChange={(e) => {
        onChange(e);
      }}
    >
      <option value="0">예정</option>
      <option value="1">진행</option>
      <option value="2">종료</option>
    </select>
  );
};

const TitleInput = ({ title, onChange }) => {
  return (
    <label
      htmlFor="title"
      className="col-start-2 col-end-[-1] row-start-1 row-end-2 items-stretch"
    >
      <input
        type="text"
        id="title"
        name="title"
        value={title || ""}
        className="connect-input w-full pl-1"
        placeholder="제목"
        onChange={(e) => {
          onChange(e);
        }}
      />
    </label>
  );
};

const StartDateInput = ({ startDate, onChange }) => {
  return (
    <label htmlFor="startDate" className="col-span-2 row-start-3 row-end-4">
      <span className="input-label">시작일</span>
      <input
        value={startDate || ""}
        type="date"
        name="startDate"
        id="startDate"
        className="connect-input"
        onChange={(e) => {
          onChange(e);
        }}
      />
    </label>
  );
};

const EndDateInput = ({ endDate, onChange }) => {
  return (
    <label htmlFor="endDate" className="col-span-2 row-start-3 row-end-4 ">
      <span className="input-label">종료일</span>
      <input
        value={endDate || ""}
        type="date"
        name="endDate"
        id="endDate"
        className="connect-input"
        onChange={(e) => {
          onChange(e);
        }}
      />
    </label>
  );
};

const PasswordInput = ({ authString, onChange }) => {
  return (
    <label
      htmlFor="password"
      className="col-span-2 row-start-4 row-end-5 text-right "
    >
      <span className="input-label">비밀번호</span>
      <input
        value={authString || ""}
        type="password"
        name="authString"
        id="password"
        className="connect-input w-12"
        onChange={(e) => {
          onChange(e);
        }}
      />
    </label>
  );
};

export const ActivityForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const activityInput = useSelector((state) => state.inputs.activityInput);

  const onChange = useCallback(
    (e) => {
      dispatch(changeActivityInput(e.target));
    },
    [dispatch]
  );

  const {
    title,
    type,
    author,
    createDate,
    description,
    startDate,
    endDate,
    currentState,
    authString,
    tags,
  } = activityInput;

  return (
    <div className="flex flex-col mx-1 my-2 gap-2">
      <div className="col-start-1 col-end-2 row-start-1 row-end-2 flex gap-3">
        <SelectType type={type} onChange={onChange} />
        <SelectCurrentState currentState={currentState} onChange={onChange} />
      </div>
      <TitleInput title={title} onChange={onChange} />
      <div className="col-span-5 row-start-2 row-end-3 ">
        <ClassicCKEditor
          onChange={onChange}
          value={description}
          name="description"
        />
      </div>
      <div className="flex gap-2">
        <StartDateInput startDate={startDate} onChange={onChange} />
        <EndDateInput endDate={endDate} onChange={onChange} />
      </div>
      <TagInput onChange={onChange} prevTags={tags} />
      <PasswordInput authString={authString} onChange={onChange} />
    </div>
  );
};

export default ActivityForm;
