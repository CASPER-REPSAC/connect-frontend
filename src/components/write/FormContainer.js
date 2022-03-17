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

const SubHeader = ({ children }) => {
  return <h4 className="text-text-800">{children}</h4>;
};

export const FormContainerWriteChapter = () => {
  const [showRequiredFields, setShowRequiredFields] = useState(false);
  const navigate = useNavigate();
  const { activity_id } = useParams();
  const dispatch = useDispatch();

  const chapterInput = useSelector((state) => state.inputs.chapterInput);
  const { subject, article } = chapterInput;

  const onSubmit = useCallback(() => {
    if (!subject || !article) {
      setShowRequiredFields(true);
    } else {
      dispatch(changeChapterInput({ name: "activity_id", value: activity_id }));
      dispatch(createChapter(navigate));
    }
  }, [dispatch, activity_id, navigate, subject, article]);

  useEffect(() => {
    return () => {
      dispatch(removeError("chapter"));
    };
  }, [dispatch]);

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
  const [showRequiredFields, setShowRequiredFields] = useState(false);
  const navigate = useNavigate();
  const { activity_id, chapter_id } = useParams();
  const dispatch = useDispatch();

  const chapter = useSelector((state) => state.chapters[chapter_id]);
  const chapterInput = useSelector((state) => state.inputs.chapterInput);
  const { subject, article } = chapterInput;

  const onDeleteFilesChange = useCallback(
    (fileDelete) => {
      dispatch(changeChapterInput({ name: "file_delete", value: fileDelete }));
    },
    [dispatch]
  );

  const onSubmit = useCallback(() => {
    if (!subject || !article) {
      setShowRequiredFields(true);
    } else {
      dispatch(changeChapterInput({ name: "activity_id", value: activity_id }));
      dispatch(updateChapter(activity_id, chapter_id, navigate));
    }
  }, [dispatch, activity_id, chapter_id, navigate, subject, article]);

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
  const [showRequiredFields, setShowRequiredFields] = useState(false);
  const activityInput = useSelector((state) => state.inputs.activityInput);

  const { title, description, startDate, endDate } = activityInput;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = useCallback(() => {
    if (
      !title ||
      !description ||
      !startDate ||
      !endDate ||
      new Date(startDate) > new Date(endDate)
    ) {
      setShowRequiredFields(true);
    } else {
      dispatch(createActivity(navigate));
    }
  }, [dispatch, navigate, title, description, startDate, endDate]);

  useEffect(() => {
    return () => {
      dispatch(removeError("activity"));
    };
  }, [dispatch]);

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
  const [showRequiredFields, setShowRequiredFields] = useState(false);
  const activityInput = useSelector((state) => state.inputs.activityInput);

  const { title, description, startDate, endDate } = activityInput;

  const { activity_id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeleteParticipantsChange = useCallback(
    (paticipantDelete) => {
      dispatch(
        changeActivityInput({
          name: "participants_delete",
          value: paticipantDelete,
        })
      );
    },
    [dispatch]
  );

  const onSubmit = useCallback(() => {
    if (
      !title ||
      !description ||
      !startDate ||
      !endDate ||
      new Date(startDate) > new Date(endDate)
    ) {
      setShowRequiredFields(true);
    } else {
      dispatch(updateActivity(activity_id, navigate));
    }
  }, [dispatch, navigate, activity_id, title, description, startDate, endDate]);

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
      {activity && (
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
