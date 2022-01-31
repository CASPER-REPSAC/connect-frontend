// action types
const CHANGE_SEARCH_INPUT = "inputs/CHANGE_SEARCH_INPUT";
const REMOVE_SEARCH_INPUT = "inputs/REMOVE_SEARCH_INPUT";

const CHANGE_ACTIVITY_INPUT = "inputs/CHANGE_ACTIVITY_INPUT";
const REMOVE_ACTIVITY_INPUT = "inputs/REMOVE_ACTIVITY_INPUT";

const CHANGE_CHAPTER_INPUT = "inputs/CHANGE_CHAPTER_INPUT";
const REMOVE_CHAPTER_INPUT = "inputs/REMOVE_CHAPTER_INPUT";

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

const initialState = {
  searchInput: {
    keyword: "",
    type: "all",
  },
  activityInput: {
    title: "",
    createDate: "",
    authstring: "",
  },
  chapterInput: {
    subject: "",
    content: "",
    authstring: "",
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
    default:
      return state;
  }
};

export default inputs;
