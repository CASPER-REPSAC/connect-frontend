// action types
const CHANGE_SEARCH_INPUT = "inputs/CHANGE_SEARCH_INPUT";
const REMOVE_SEARCH_INPUT = "inputs/REMOVE_SEARCH_INPUT";

const CHANGE_ACTIVITY_INPUT = "inputs/CHANGE_ACTIVITY_INPUT";
const REMOVE_ACTIVITY_INPUT = "inputs/REMOVE_ACTIVITY_INPUT";

const CHANGE_CHAPTER_INPUT = "inputs/CHANGE_CHAPTER_INPUT";
const REMOVE_CHAPTER_INPUT = "inputs/REMOVE_CHAPTER_INPUT";

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

export const changeChapterInput = (target) => ({
  type: CHANGE_CHAPTER_INPUT,
  target,
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
  },
  chapterInput: {
    subject: "",
    article: "",
    authstring: "",
  },
  commentInput: {
    65: "",
  },
};

export const inputs = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_INPUT:
      return {
        ...state,
        searchInput: {
          ...state.searchInput,
          [action.target.name]: action.target.value,
        },
      };
    case CHANGE_ACTIVITY_INPUT:
      return {
        ...state,
        activityInput: {
          ...state.activityInput,
          [action.target.name]: action.target.value,
        },
      };
    case CHANGE_CHAPTER_INPUT:
      return {
        ...state,
        chapterInput: {
          ...state.chapterInput,
          [action.target.name]: action.target.value,
        },
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
    default:
      return state;
  }
};

export default inputs;
