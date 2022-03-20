import React, { useEffect, useCallback, useState } from "react";
import { ActivityForm, ChapterForm } from "#comp/write";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  changeChapterInput,
  setActivityInput,
  removeActivityInput,
  removeChapterInput,
  setChapterInput,
  changeActivityInput,
} from "@/redux/inputs";
import { createChapter, updateChapter } from "@/redux/chapters";
import { removeError } from "@/redux/loadings";
import {
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
} from "@/redux/activities";
import { getChapter } from "@/redux/chapters";
import { formDateAsFormData } from "#serv";
import { SubmitButtonWithText, ActivityRemoveButton } from "#comp/common";
import {
  DeletableChapterFileList,
  DeletableParticipantsList,
} from "./UpdatableDatas";

import {
  useCreateChapter,
  useCreateActivity,
  useUpdateActivity,
  useUpdateChapter,
} from "@/hooks/";

const SubHeader = ({ children }) => {
  return <h4 className="text-text-800">{children}</h4>;
};

export const FormContainerWriteChapter = () => {
  const { onSubmit, chapterInput, showRequiredFields } = useCreateChapter();
  return (
    <div>
      <SubHeader>챕터 작성</SubHeader>
      <ChapterForm
        showRequiredFields={showRequiredFields}
        chapterInput={chapterInput}
      />
      <div className="flex justify-end">
        <SubmitButtonWithText onClick={onSubmit} />
      </div>
    </div>
  );
};

export const FormContainerUpdateChapter = () => {
  const {
    onSubmit,
    chapterInput,
    showRequiredFields,
    onDeleteFilesChange,
    chapter,
  } = useUpdateChapter();

  return (
    <div>
      <SubHeader>챕터 수정</SubHeader>
      {chapter && (
        <div className=" py-1 px-2">
          <ChapterForm
            showRequiredFields={showRequiredFields}
            chapterInput={chapterInput}
          />
          <div className="flex justify-between mt-2">
            <DeletableChapterFileList
              files={chapter[1]}
              onDeleteFilesChange={onDeleteFilesChange}
            />
            <SubmitButtonWithText onClick={onSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export const FormContainerWriteActivity = () => {
  const { showRequiredFields, activityInput, onSubmit } = useCreateActivity();
  return (
    <div>
      <SubHeader>액티비티 작성</SubHeader>
      <ActivityForm
        showRequiredFields={showRequiredFields}
        activityInput={activityInput}
      />
      <div className="flex justify-end">
        <SubmitButtonWithText onClick={onSubmit} />
      </div>
    </div>
  );
};

export const FormContainerUpdateActivity = () => {
  const {
    activity,
    isInputsSet,
    showRequiredFields,
    activityInput,
    onDeleteParticipantsChange,
    onRemove,
    onSubmit,
  } = useUpdateActivity();
  return (
    <div>
      <SubHeader>액티비티 수정</SubHeader>
      {activity && isInputsSet && (
        <>
          <ActivityForm
            showRequiredFields={showRequiredFields}
            activityInput={activityInput}
          />
          <DeletableParticipantsList
            participants={activity.participants}
            onDeleteParticipantsChange={onDeleteParticipantsChange}
          />
          <div className="flex justify-between py-1 px-2 mt-4">
            <ActivityRemoveButton onRemove={onRemove} />
            <SubmitButtonWithText onClick={onSubmit} />
          </div>
        </>
      )}
    </div>
  );
};

export const FormContainer = {
  WriteActivity: FormContainerWriteActivity,
  WriteChapter: FormContainerWriteChapter,
  UpdateActivity: FormContainerUpdateActivity,
  UpdateChapter: FormContainerUpdateChapter,
};
