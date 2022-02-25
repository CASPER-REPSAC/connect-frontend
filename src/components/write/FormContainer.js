import React, { useEffect, useCallback } from "react";
import { ActivityForm, ChapterForm } from "#comp/write";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  changeChapterInput,
  setActivityInput,
  removeActivityInput,
  removeChapterInput,
  setChapterInput,
} from "@/redux/inputs";
import { createChapter, updateChapter } from "@/redux/chapters";
import { removeError } from "@/redux/loadings";
import {
  getContainedActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
} from "@/redux/activities";
import { getChapter } from "@/redux/chapters";
import { formDateAsFormData } from "#serv";
import { SubmitButtonWithText, ActivityRemoveButton } from "#comp/common";
import { DeletableChapterFileList } from "./UpdatableDatas";

const SubHeader = ({ children }) => {
  return <h4 className="text-text-800">{children}</h4>;
};

export const FormContainerWriteChapter = () => {
  const navigate = useNavigate();
  const { activity_id } = useParams();
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch(changeChapterInput({ name: "activity_id", value: activity_id }));
    dispatch(createChapter(navigate));
  }, [dispatch, activity_id, navigate]);

  useEffect(() => {
    return () => {
      dispatch(removeError("chapter"));
    };
  }, [dispatch]);

  return (
    <div>
      <SubHeader>챕터 작성</SubHeader>
      <ChapterForm />
      <div className="flex justify-end">
        <SubmitButtonWithText onClick={onSubmit} />
      </div>
    </div>
  );
};

export const FormContainerUpdateChapter = () => {
  const navigate = useNavigate();
  const { activity_id, chapter_id } = useParams();
  const dispatch = useDispatch();

  const chapter = useSelector((state) => state.chapters[chapter_id]);

  const onDeleteFilesChange = (fileDelete) => {
    dispatch(changeChapterInput({ name: "file_delete", value: fileDelete }));
  };

  const onSubmit = useCallback(() => {
    dispatch(changeChapterInput({ name: "activity_id", value: activity_id }));
    dispatch(updateChapter(activity_id, chapter_id, navigate));
  }, [dispatch, activity_id, chapter_id, navigate]);

  useEffect(() => {
    if (!chapter) dispatch(getChapter(activity_id, chapter_id));
    else
      dispatch(
        setChapterInput({ ...chapter[0], file_delete: [], authString: "" })
      );
  }, [chapter, dispatch, activity_id, chapter_id]);

  useEffect(() => {
    return () => {
      dispatch(removeError("update_chapter"));
      dispatch(removeChapterInput());
    };
  }, [dispatch]);

  return (
    <div>
      <SubHeader>챕터 수정</SubHeader>
      {chapter && (
        <div className=" py-1 px-2">
          <ChapterForm />
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = useCallback(() => {
    dispatch(createActivity(navigate));
  }, [dispatch, navigate]);

  useEffect(() => {
    return () => {
      dispatch(removeError("activity"));
    };
  }, [dispatch]);

  return (
    <div>
      <SubHeader>액티비티 작성</SubHeader>
      <ActivityForm />
      <div className="flex justify-end">
        <SubmitButtonWithText onClick={onSubmit} />
      </div>
    </div>
  );
};

export const FormContainerUpdateActivity = () => {
  const { activity_id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(() => {
    dispatch(updateActivity(activity_id, navigate));
  }, [dispatch, navigate, activity_id]);

  const activity = useSelector(
    (state) => state.activities.activity[activity_id]
  );

  const onRemove = () => {
    dispatch(deleteActivity(activity_id, navigate));
  };

  useEffect(() => {
    if (!activity) dispatch(getActivity(activity_id));
    else
      dispatch(
        setActivityInput({
          ...activity,
          tags: activity.tags.map((tag) => tag.tag_name),
          participants_delete: [],
        })
      );
  }, [activity, dispatch, activity_id]);

  useEffect(() => {
    return () => {
      dispatch(removeError("update_activity"));
      dispatch(removeActivityInput());
    };
  }, [dispatch]);

  return (
    <div>
      <SubHeader>액티비티 수정</SubHeader>
      <ActivityForm />
      <div className="flex justify-between py-1 px-2">
        <ActivityRemoveButton onRemove={onRemove} />
        <SubmitButtonWithText onClick={onSubmit} />
      </div>
    </div>
  );
};

export const FormContainer = {
  WriteActivity: FormContainerWriteActivity,
  WriteChapter: FormContainerWriteChapter,
  UpdateActivity: FormContainerUpdateActivity,
  UpdateChapter: FormContainerUpdateChapter,
};
