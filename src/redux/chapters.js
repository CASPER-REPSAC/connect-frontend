import { chaptersAPI } from "@/api";
import { removeChapterInput, removeChapterInputFile } from "./inputs";
import { resultActionStringCreator } from "#serv";
import { getActivity } from "./activities";
import { startLoading, requestSuccess, requestFail } from "./loadings";

const GET_CHAPTER = "chapters/GET_CHAPTER";
const SET_CHAPTER = "chapters/SET_CHAPTER";

const CREATE_CHAPTER_FILE = "chapters/CREATE_CHAPTER_FILE";
const CREATE_CHAPTER = "chapters/CREATE_CHAPTER";
const UPDATE_CHAPTER = "chapters/UPDATE_CHAPTER";
const DELETE_CHAPTER = "chapters/DELETE_CHAPTER";

export const getChapter = (activity_id, chapter_id) => async (dispatch) => {
  dispatch(startLoading(GET_CHAPTER));
  try {
    const activity = await chaptersAPI.get_chapter(activity_id, chapter_id);
    dispatch(requestSuccess(GET_CHAPTER));
    dispatch({ type: SET_CHAPTER, data: activity, chapter_id });
  } catch (error) {
    dispatch(requestFail(GET_CHAPTER, error));
  }
};

export const createChapterFiles =
  (activity_id, chapter_id, navigate) => async (dispatch, getState) => {
    const [success, fail] = [
      `${CREATE_CHAPTER_FILE}_SUCCESS`,
      `${CREATE_CHAPTER_FILE}_FAIL`,
    ];

    const files = getState().inputs.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        dispatch({ type: CREATE_CHAPTER_FILE, filename: file.name });
        try {
          await chaptersAPI.create_chapter_file({
            file: file,
            activity_id,
            chapter_id,
          });
          dispatch({ type: success, filename: file.name });
          dispatch(removeChapterInputFile(file.name));

          if (i === files.length - 1) {
            navigate(`/activities/${activity_id}/chapter/${chapter_id}`);
            dispatch(getActivity(activity_id));
            dispatch(getChapter(activity_id, chapter_id));
          }
        } catch (error) {
          dispatch({ type: fail, error });
        }
      }
    } else {
      navigate(`/activities/${activity_id}/chapter/${chapter_id}`);
      getActivity(activity_id);
    }
  };

export const createChapter = (navigate) => async (dispatch, getState) => {
  dispatch(startLoading(CREATE_CHAPTER));
  try {
    const chapterInput = getState().inputs.chapterInput;
    const chapterRes = await chaptersAPI.create_chapter({
      ...chapterInput,
    });
    dispatch(requestSuccess(CREATE_CHAPTER));
    dispatch(
      createChapterFiles(chapterRes.activityid, chapterRes.chapterid, navigate)
    );
    dispatch(removeChapterInput());
  } catch (error) {
    dispatch(requestFail(CREATE_CHAPTER, error));
  }
};

export const updateChapter =
  (activity_id, chapter_id, navigate) => async (dispatch, getState) => {
    dispatch(startLoading(UPDATE_CHAPTER));

    try {
      const chapterInput = getState().inputs.chapterInput;
      await chaptersAPI.update_chapter({
        ...chapterInput,
        activity_id,
        chapter_id,
      });
      dispatch(requestSuccess(UPDATE_CHAPTER));
      dispatch(createChapterFiles(activity_id, chapter_id, navigate));
      dispatch(removeChapterInput());
    } catch (error) {
      dispatch(requestFail(UPDATE_CHAPTER, error));
    }
  };

export const deleteChapter =
  (activity_id, chapter_id, navigate) => async (dispatch, getState) => {
    dispatch(startLoading(DELETE_CHAPTER));
    try {
      await chaptersAPI.delete_chapter(activity_id, chapter_id);
      dispatch(requestSuccess(DELETE_CHAPTER));
      navigate(`/activities/${activity_id}`);
      dispatch(getActivity(activity_id));
    } catch (error) {
      dispatch(requestFail(DELETE_CHAPTER, error));
    }
  };

const initialState = {
  37: null,
};

export const chapters = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAPTER:
      return {
        ...state,
        [action.chapter_id]: action.data,
      };

    default:
      return state;
  }
};

export default chapters;
