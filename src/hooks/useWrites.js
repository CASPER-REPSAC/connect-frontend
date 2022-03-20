import { useEffect, useCallback, useState } from "react";
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

export const useCreateChapter = () => {
  const [showRequiredFields, setShowRequiredFields] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activity_id } = useParams();

  const chapterInput = useSelector((state) => state.inputs.chapterInput);

  const onSubmit = useCallback(() => {
    if (!chapterInput.subject || !chapterInput.article) {
      setShowRequiredFields(true);
    } else {
      dispatch(changeChapterInput({ name: "activity_id", value: activity_id }));
      dispatch(createChapter(navigate));
    }
  }, [dispatch, activity_id, navigate, chapterInput]);

  useEffect(() => {
    return () => {
      dispatch(removeError("chapter"));
    };
  }, [dispatch]);

  return { onSubmit, chapterInput, showRequiredFields };
};

export const useUpdateChapter = () => {
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

  return {
    onSubmit,
    chapterInput,
    showRequiredFields,
    onDeleteFilesChange,
    chapter,
  };
};

export const useCreateActivity = () => {
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

  return {
    showRequiredFields,
    activityInput,
    onSubmit,
  };
};

export const useUpdateActivity = () => {
  const [showRequiredFields, setShowRequiredFields] = useState(false);
  const [isInputsSet, setIsInputsSet] = useState(false);
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
    else {
      dispatch(
        setActivityInput({
          ...activity,
          tags: activity.tags.map((tag) => tag.tag_name),
          participants_delete: [],
        })
      );
      setIsInputsSet(true);
    }
  }, [activity, dispatch, activity_id]);

  useEffect(() => {
    return () => {
      dispatch(removeError("update_activity"));
      dispatch(removeActivityInput());
    };
  }, [dispatch]);

  return {
    activity,
    isInputsSet,
    showRequiredFields,
    activityInput,
    onDeleteParticipantsChange,
    onRemove,
    onSubmit,
  };
};
