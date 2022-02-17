import * as commentsAPI from "@/api/comments";
import * as activitiesAPI from "@/api/activities";
import * as chaptersAPI from "@/api/chapters";
import { getChapter } from "./chapters";
import { getActivity } from "./activities";
import {
  removeCommentInput,
  removeChapterInput,
  removeChapterInputFile,
} from "./inputs";

const CUDActionTypeCreator = (type) => {
  const CUD = ["CREATE", "UPDATE", "DELETE"];
  let rst = [];
  CUD.map((v) => {
    rst = rst.concat([
      `submits/${type}_${v}`,
      `submits/${type}_${v}_SUCCESS`,
      `submit/${type}_${v}_FAIL`,
    ]);
  });
  return rst;
};

const [
  CREATE_COMMENT,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  UPDATE_COMMENT,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
] = CUDActionTypeCreator("COMMENT");

const [
  CREATE_ACTIVITY,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_FAIL,
  UPDATE_ACTIVITY,
  UPDATE_ACTIVITY_SUCCESS,
  UPDATE_ACTIVITY_FAIL,
  DELETE_ACTIVITY,
  DELETE_ACTIVITY_SUCCESS,
  DELETE_ACTIVITY_FAIL,
] = CUDActionTypeCreator("ACTIVITY");

const [
  CREATE_CHAPTER,
  CREATE_CHAPTER_SUCCESS,
  CREATE_CHAPTER_FAIL,
  UPDATE_CHAPTER,
  UPDATE_CHAPTER_SUCCESS,
  UPDATE_CHAPTER_FAIL,
  DELETE_CHAPTER,
  DELETE_CHAPTER_SUCCESS,
  DELETE_CHAPTER_FAIL,
] = CUDActionTypeCreator("CHAPTER");

const CREATE_CHAPTER_FILE = "CHAPTER/CREATE_CHAPTER_FILE";
const CREATE_CHAPTER_FILE_SUCCESS = "CHAPTER/CREATE_CHAPTER_FILE_SUCCESS";
const CREATE_CHAPTER_FILE_FAIL = "CHAPTER/CREATE_CHAPTER_FILE_FAIL";

const REMOVE_ERROR = "CHAPTER/REMOVE_ERROR";

const resultActionStringCreator = (baseAction) => [
  `${baseAction}_SUCCESS`,
  `${baseAction}_FAIL`,
];

export const createComment =
  (activity_id, chapter_id) => async (dispatch, getState) => {
    const [success, fail] = [
      `${CREATE_COMMENT}_SUCCESS`,
      `${CREATE_COMMENT}_FAIL`,
    ];

    dispatch({ type: CREATE_COMMENT });
    try {
      const writer = getState().auth.user.pk;
      const comment = getState().inputs.commentInput[chapter_id];
      await commentsAPI.create_comment({
        writer,
        comment,
        chapter_id,
        activity_id,
      });
      dispatch(removeCommentInput(chapter_id));
      dispatch({ type: success });
      dispatch(getChapter(activity_id, chapter_id));
    } catch (error) {
      dispatch({ type: fail, error });
    }
  };

export const createActivity = () => async (dispatch, getState) => {
  const [success, fail] = resultActionStringCreator(CREATE_ACTIVITY);

  dispatch({ type: CREATE_ACTIVITY });
  try {
    const author = getState().auth.user.pk;
    const activityInput = getState().inputs.activityInput;
    await activitiesAPI.create_activity({
      ...activityInput,
      author,
      currentState: activityInput.currentState * 1,
    });
    dispatch({ type: success });
  } catch (error) {
    dispatch({ type: fail, error });
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
          navigate(`/activities/${activity_id}/chapter/${chapter_id}`);
          getActivity(activity_id);
        } catch (error) {
          dispatch({ type: error, filename: file.name });
        }
      }
    } else {
      navigate(`/activities/${activity_id}/chapter/${chapter_id}`);
      getActivity(activity_id);
    }
  };

export const createChapter = (navigate) => async (dispatch, getState) => {
  const [success, fail] = resultActionStringCreator(CREATE_CHAPTER);

  dispatch({ type: CREATE_CHAPTER });
  try {
    const chapterInput = getState().inputs.chapterInput;
    const chapterRes = await chaptersAPI.create_chapter({
      ...chapterInput,
    });
    dispatch({ type: success });
    dispatch(
      createChapterFiles(chapterRes.activityid, chapterRes.chapterid, navigate)
    );
    dispatch(removeChapterInput());
  } catch (error) {
    dispatch({ type: fail, error });
  }
};

export const deleteComment =
  (commentpk, activity_id, chapter_id) => async (dispatch, getState) => {
    const [success, fail] = resultActionStringCreator(DELETE_COMMENT);
    dispatch({ type: DELETE_COMMENT });
    try {
      const token = getState().auth.accessToken;
      commentsAPI.delete_comment({ commentpk, token });
      dispatch({ type: success });
      dispatch(getChapter(activity_id, chapter_id));
    } catch (error) {
      dispatch({ type: fail, error });
    }
  };

export const removeError = (key) => {
  return { type: REMOVE_ERROR, key };
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
      return submitStateHelper("create_comment", CREATE_COMMENT)(state, action);
    case CREATE_ACTIVITY:
    case CREATE_ACTIVITY_SUCCESS:
    case CREATE_ACTIVITY_FAIL:
      return submitStateHelper("create_activity", CREATE_ACTIVITY)(
        state,
        action
      );
    case CREATE_CHAPTER:
    case CREATE_CHAPTER_SUCCESS:
    case CREATE_CHAPTER_FAIL:
      return submitStateHelper("create_chapter", CREATE_CHAPTER)(state, action);
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
    case REMOVE_ERROR:
      return {
        ...state,
        [action.key]: {
          loading: false,
          error: null,
        },
      };
    case DELETE_COMMENT:
    case DELETE_COMMENT_SUCCESS:
    case DELETE_COMMENT_FAIL:
      return submitStateHelper("delete_comment", DELETE_COMMENT)(state, action);
    case DELETE_CHAPTER:
    case DELETE_CHAPTER_SUCCESS:
    case DELETE_CHAPTER_FAIL:
      return submitStateHelper("delete_chapter", DELETE_CHAPTER)(state, action);
    default:
      return state;
  }
};

export default submits;
