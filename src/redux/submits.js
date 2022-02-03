import * as commentsAPI from "@/api/comments";
import * as activitiesAPI from "@/api/activities";
import * as chaptersAPI from "@/api/chapters";
import { getChapter } from "./chapters";
import { removeCommentInput } from "./inputs";
import { setError } from "./alerts";

const SUBMIT_COMMENT = "comments/SUBMIT_COMMENT";
const SUBMIT_COMMENT_SUCCESS = "comments/SUBMIT_COMMENT_SUCCESS";
const SUBMIT_COMMENT_FAIL = "comments/SUBMIT_COMMENT_FAIL";

const SUBMIT_ACTIVITY = "ACTIVITY/SUBMIT_ACTIVITY";
const SUBMIT_ACTIVITY_SUCCESS = "ACTIVITY/SUBMIT_ACTIVITY_SUCCESS";
const SUBMIT_ACTIVITY_FAIL = "ACTIVITY/SUBMIT_ACTIVITY_FAIL";

const SUBMIT_CHAPTER = "CHAPTER/SUBMIT_CHAPTER";
const SUBMIT_CHAPTER_SUCCESS = "CHAPTER/SUBMIT_CHAPTER_SUCCESS";
const SUBMIT_CHAPTER_FAIL = "CHAPTER/SUBMIT_CHAPTER_FAIL";
//   comment,
//   activityid,
//   chapterid,
//   writer
export const submitComment =
  (activity_id, chapter_id) => async (dispatch, getState) => {
    const [success, fail] = [
      `${SUBMIT_COMMENT}_SUCCESS`,
      `${SUBMIT_COMMENT}_FAIL`,
    ];

    dispatch({ type: SUBMIT_COMMENT });
    try {
      const writer = getState().auth.user.pk;
      const token = getState().auth.accessToken;
      const comment = getState().inputs.commentInput[chapter_id];
      await commentsAPI.submit_comment({
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

export const submitActivity = () => async (dispatch, getState) => {
  const [success, fail] = [
    `${SUBMIT_ACTIVITY}_SUCCESS`,
    `${SUBMIT_ACTIVITY}_FAIL`,
  ];

  dispatch({ type: SUBMIT_ACTIVITY });
  try {
    const author = getState().auth.user.pk;
    const activityInput = getState().inputs.activityInput;
    const token = getState().auth.accessToken;
    await activitiesAPI.submit_activity({
      ...activityInput,
      author,
      token,
    });
    dispatch({ type: success });
  } catch (error) {
    dispatch({ type: fail, error });
    dispatch(setError(error.message, error.response));
  }
};

export const submitChapter = () => async (dispatch, getState) => {
  const [success, fail] = [
    `${SUBMIT_CHAPTER}_SUCCESS`,
    `${SUBMIT_CHAPTER}_FAIL`,
  ];

  dispatch({ type: SUBMIT_CHAPTER });
  try {
    const chapterInput = getState().inputs.chapterInput;
    const token = getState().auth.accessToken;
    await chaptersAPI.submit_chapter({
      ...chapterInput,
      token,
    });
    dispatch({ type: success });
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
};

const submitStateHelper = (submitType, baseActionType) => (state, action) => {
  const [success, fail] = [
    `${baseActionType}_SUCCESS`,
    `${baseActionType}_FAIL`,
  ];
  switch (action.type) {
    case baseActionType:
      return {
        ...state,
        [submitType]: {
          ...state[submitType],
          error: null,
          loading: true,
        },
      };
    case success:
      return {
        ...state,
        [submitType]: {
          ...state[submitType],

          error: null,
          loading: false,
        },
      };
    case fail:
      return {
        ...state,
        [submitType]: {
          ...state[submitType],
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
    case SUBMIT_COMMENT:
    case SUBMIT_COMMENT_SUCCESS:
    case SUBMIT_COMMENT_FAIL:
      return submitStateHelper("comment", SUBMIT_COMMENT)(state, action);
    case SUBMIT_ACTIVITY:
    case SUBMIT_ACTIVITY_SUCCESS:
    case SUBMIT_ACTIVITY_FAIL:
      return submitStateHelper("activity", SUBMIT_ACTIVITY)(state, action);
    case SUBMIT_CHAPTER:
    case SUBMIT_CHAPTER_SUCCESS:
    case SUBMIT_CHAPTER_FAIL:
      return submitStateHelper("chapter", SUBMIT_CHAPTER)(state, action);
    default:
      return state;
  }
};

export default submits;
