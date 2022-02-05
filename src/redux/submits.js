import * as commentsAPI from "@/api/comments";
import * as activitiesAPI from "@/api/activities";
import * as chaptersAPI from "@/api/chapters";
import { getChapter } from "./chapters";
import {
  removeCommentInput,
  removeChapterInput,
  removeChapterInputFile,
} from "./inputs";
import { setError } from "./alerts";

const CREATE_COMMENT = "comments/CREATE_COMMENT";
const CREATE_COMMENT_SUCCESS = "comments/CREATE_COMMENT_SUCCESS";
const CREATE_COMMENT_FAIL = "comments/CREATE_COMMENT_FAIL";

const CREATE_ACTIVITY = "ACTIVITY/CREATE_ACTIVITY";
const CREATE_ACTIVITY_SUCCESS = "ACTIVITY/CREATE_ACTIVITY_SUCCESS";
const CREATE_ACTIVITY_FAIL = "ACTIVITY/CREATE_ACTIVITY_FAIL";

const CREATE_CHAPTER = "CHAPTER/CREATE_CHAPTER";
const CREATE_CHAPTER_SUCCESS = "CHAPTER/CREATE_CHAPTER_SUCCESS";
const CREATE_CHAPTER_FAIL = "CHAPTER/CREATE_CHAPTER_FAIL";

const CREATE_CHAPTER_FILE = "CHAPTER/CREATE_CHAPTER_FILE";
const CREATE_CHAPTER_FILE_SUCCESS = "CHAPTER/CREATE_CHAPTER_FILE_SUCCESS";
const CREATE_CHAPTER_FILE_FAIL = "CHAPTER/CREATE_CHAPTER_FILE_FAIL";

//   comment,
//   activityid,
//   chapterid,
//   writer
export const createComment =
  (activity_id, chapter_id) => async (dispatch, getState) => {
    const [success, fail] = [
      `${CREATE_COMMENT}_SUCCESS`,
      `${CREATE_COMMENT}_FAIL`,
    ];

    dispatch({ type: CREATE_COMMENT });
    try {
      const writer = getState().auth.user.pk;
      const token = getState().auth.accessToken;
      const comment = getState().inputs.commentInput[chapter_id];
      await commentsAPI.create_comment({
        writer,
        comment,
        chapter_id,
        activity_id,
        token,
      });
      dispatch(removeCommentInput(chapter_id));
      dispatch(getChapter(activity_id, chapter_id));
      dispatch({ type: success });
    } catch (error) {
      dispatch({ type: fail, error });
      dispatch(setError(error.message, error.response));
    }
  };

export const createActivity = () => async (dispatch, getState) => {
  const [success, fail] = [
    `${CREATE_ACTIVITY}_SUCCESS`,
    `${CREATE_ACTIVITY}_FAIL`,
  ];

  dispatch({ type: CREATE_ACTIVITY });
  try {
    const author = getState().auth.user.pk;
    const activityInput = getState().inputs.activityInput;
    const token = getState().auth.accessToken;
    await activitiesAPI.create_activity({
      ...activityInput,
      author,
      token,
      currentState: activityInput.currentState * 1,
    });
    dispatch({ type: success });
  } catch (error) {
    dispatch({ type: fail, error });
    dispatch(setError(error.message, error.response));
  }
};

export const createChapterFiles =
  (activity_id, chapter_id) => async (dispatch, getState) => {
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
          const token = getState().auth.accessToken;
          await chaptersAPI.create_chapter_file({
            file: file,
            activity_id,
            chapter_id,
            token,
          });
          dispatch({ type: success, filename: file.name });
          dispatch(removeChapterInputFile(file.name));
        } catch (error) {
          dispatch({ type: error, filename: file.name });
          dispatch(setError(error.message, error.response));
        }
      }
    }
  };

export const createChapter = () => async (dispatch, getState) => {
  const [success, fail] = [
    `${CREATE_CHAPTER}_SUCCESS`,
    `${CREATE_CHAPTER}_FAIL`,
  ];

  dispatch({ type: CREATE_CHAPTER });
  try {
    const chapterInput = getState().inputs.chapterInput;
    const token = getState().auth.accessToken;
    const chapterRes = await chaptersAPI.create_chapter({
      ...chapterInput,
      token,
    });
    console.log(chapterRes);
    dispatch({ type: success });
    dispatch(createChapterFiles(chapterRes.activityid, chapterRes.chapterid));
    dispatch(removeChapterInput());
  } catch (error) {
    dispatch({ type: fail, error });
    dispatch(setError(error.message, error.response));
  }
};

const initialState = {
  comment: {
    loading: false,
    error: null,
  },
  activity: {
    loading: false,
    error: null,
  },
  chapter: {
    loading: false,
    error: null,
  },
  files: {
    fileName: {
      loading: false,
      error: null,
    },
  },
};

const submitStateHelper = (key, baseActionType) => (state, action) => {
  const [success, fail] = [
    `${baseActionType}_SUCCESS`,
    `${baseActionType}_FAIL`,
  ];
  switch (action.type) {
    case baseActionType:
      return {
        ...state,
        [key]: {
          ...state[key],
          error: null,
          loading: true,
        },
      };
    case success:
      return {
        ...state,
        [key]: {
          ...state[key],

          error: null,
          loading: false,
        },
      };
    case fail:
      return {
        ...state,
        [key]: {
          ...state[key],
          error: action.error,
          loading: false,
        },
      };

    default:
      return state;
  }
};

export const submits = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT:
    case CREATE_COMMENT_SUCCESS:
    case CREATE_COMMENT_FAIL:
      return submitStateHelper("comment", CREATE_COMMENT)(state, action);
    case CREATE_ACTIVITY:
    case CREATE_ACTIVITY_SUCCESS:
    case CREATE_ACTIVITY_FAIL:
      return submitStateHelper("activity", CREATE_ACTIVITY)(state, action);
    case CREATE_CHAPTER:
    case CREATE_CHAPTER_SUCCESS:
    case CREATE_CHAPTER_FAIL:
      return submitStateHelper("chapter", CREATE_CHAPTER)(state, action);
    case CREATE_CHAPTER_FILE:
      return {
        ...state,
        files: {
          ...state.files,
          [action.filename]: {
            ...state[action.filename],
            loading: true,
            error: null,
          },
        },
      };
    case CREATE_CHAPTER_FILE_SUCCESS:
      return {
        ...state,
        files: {
          ...state.files,
          [action.filename]: {
            ...state[action.filename],
            loading: false,
            error: null,
          },
        },
      };
    case CREATE_CHAPTER_FILE_FAIL:
      return {
        ...state,
        files: {
          ...state.files,
          [action.filename]: {
            ...state[action.filename],
            loading: false,
            error: action.error,
          },
        },
      };

    default:
      return state;
  }
};

export default submits;
