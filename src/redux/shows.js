// action types
const SHOW_CHAPTER_LIST = "shows/SHOW_CHAPTER_LIST";
const HIDE_CHAPTER_LIST = "shows/HIDE_CHAPTER_LIST";
const TOGGLE_CHAPTER_LIST = "shows/TOGGLE_CHAPTER_LIST";

// action type creator
export const showChapterList = () => ({ type: SHOW_CHAPTER_LIST });
export const hideChapterList = () => ({ type: HIDE_CHAPTER_LIST });
export const toggleChapterList = () => ({ type: TOGGLE_CHAPTER_LIST });

// initialState
const initialState = {
  chapterList: {
    show: true,
  },
};

// reducer

const shows = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CHAPTER_LIST:
      return { ...state, chapterList: { show: true } };
    case HIDE_CHAPTER_LIST:
      return { ...state, chapterList: { show: false } };
    case TOGGLE_CHAPTER_LIST:
      return { ...state, chapterList: { show: !state.chapterList.show } };
    default:
      return state;
  }
};

export default shows;
