// action types
const CHANGE_SEARCH_INPUT = "inputs/CHANGE_SEARCH_INPUT";
const REMOVE_SEARCH_INPUT = "inputs/REMOVE_SEARCH_INPUT";

const CHANGE_ACTIVITY_INPUT = "inputs/CHANGE_ACTIVITY_INPUT";
const REMOVE_ACTIVITY_INPUT = "inputs/REMOVE_ACTIVITY_INPUT";
const SET_ACTIVITY_INPUT = "inputs/SET_ACTIVITY_INPUT";

const CHANGE_CHAPTER_INPUT = "inputs/CHANGE_CHAPTER_INPUT";
const REMOVE_CHAPTER_INPUT = "inputs/REMOVE_CHAPTER_INPUT";
const SET_CHAPTER_INPUT = "inputs/SET_CHAPTER_INPUT";

const CHANGE_CHAPTER_INPUT_FILES = "inputs/CHANGE_CHAPTER_INPUT_FILES";
const REMOVE_CHAPTER_INPUT_FILES = "inputs/REMOVE_CHAPTER_INPUT_FILES";
const REMOVE_CHAPTER_INPUT_FILE = "inputs/REMOVE_CHAPTER_INPUT_FILE";

const CHANGE_COMMENT_INPUT = "inputs/CHANGE_COMMENT_INPUT";
const REMOVE_COMMENT_INPUT = "inputs/REMOVE_COMMENT_INPUT";

// action creator
export const changeSearchInput = (target) => ({
  type: CHANGE_SEARCH_INPUT,
  target,
});

export const removeSearchInput = () => ({
  type: REMOVE_SEARCH_INPUT,
});

// action creator
export const changeActivityInput = (target) => ({
  type: CHANGE_ACTIVITY_INPUT,
  target,
});

export const removeActivityInput = () => ({
  type: REMOVE_ACTIVITY_INPUT,
});

export const setActivityInput = (payload) => ({
  type: SET_ACTIVITY_INPUT,
  payload,
});

export const changeChapterInput = (target) => ({
  type: CHANGE_CHAPTER_INPUT,
  target,
});

export const changeChapterInputFiles = (files) => ({
  type: CHANGE_CHAPTER_INPUT_FILES,
  files,
});

export const setChapterInput = (payload) => ({
  type: SET_ACTIVITY_INPUT,
  payload,
});

export const removeChapterInputFiles = () => ({
  type: REMOVE_CHAPTER_INPUT_FILES,
});

export const removeChapterInputFile = (filename) => ({
  type: REMOVE_CHAPTER_INPUT_FILE,
  filename,
});

export const removeChapterInput = () => ({
  type: REMOVE_CHAPTER_INPUT,
});

export const changeCommentInput = (chapter_id, comment) => ({
  type: CHANGE_COMMENT_INPUT,
  chapter_id,
  comment,
});

export const removeCommentInput = (chapter_id) => ({
  type: REMOVE_COMMENT_INPUT,
  chapter_id,
});

const initialState = {
  searchInput: {
    keyword: "",
    type: "all",
  },
  activityInput: {
    title: "",
    type: "Project",
    author: "",
    createDate: "",
    description: "",
    startDate: "",
    endDate: "",
    currentState: 0,
    authString: "",
    tags: [],
    participants_delete: [],
  },
  chapterInput: {
    subject: "",
    article: "",
    authstring: "",
  },
  files: null,
  commentInput: {
    65: "",
  },
};

const changeInputHelper = (key) => (state, action) => {
  return {
    ...state,
    [key]: {
      ...state[key],
      [action.target.name]: action.target.value,
    },
  };
};

export const inputs = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_INPUT:
      return changeInputHelper("searchInput")(state, action);
    case CHANGE_ACTIVITY_INPUT:
      return changeInputHelper("activityInput")(state, action);
    case CHANGE_CHAPTER_INPUT:
      return changeInputHelper("chapterInput")(state, action);
    case CHANGE_CHAPTER_INPUT_FILES:
      return {
        ...state,
        files: action.files,
      };

    case CHANGE_COMMENT_INPUT:
      return {
        ...state,
        commentInput: {
          ...state.commentInput,
          [action.chapter_id]: action.comment,
        },
      };
    case REMOVE_COMMENT_INPUT:
      return {
        ...state,
        commentInput: {
          ...state.commentInput,
          [action.chapter_id]: "",
        },
      };
    case REMOVE_CHAPTER_INPUT:
      return {
        ...state,
        chapterInput: {
          subject: "",
          article: "",
          authstring: "",
        },
      };
    case REMOVE_ACTIVITY_INPUT:
      return {
        ...state,
        activityInput: initialState.activityInput,
      };
    case REMOVE_CHAPTER_INPUT_FILES:
      return {
        ...state,
        files: null,
      };
    case REMOVE_CHAPTER_INPUT_FILE:
      return {
        ...state,
        files: delete state.files[action.filename],
      };
    case SET_ACTIVITY_INPUT:
      return {
        ...state,
        activityInput: action.payload,
      };
    case SET_CHAPTER_INPUT:
      return {
        ...state,
        chapterInput: action.payload,
      };
    default:
      return state;
  }
};

export default inputs;
