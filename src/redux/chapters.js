import * as chaptersAPI from "@/api/chapters";

const GET_CHAPTER = "activities/GET_CHAPTER";
const GET_CHAPTER_SUCCESS = "activities/GET_CHAPTER_SUCCESS";
const GET_CHAPTER_FAIL = "activities/GET_CHAPTER_FAIL";

export const getChapter = (activity_id, chapter_id) => async (dispatch) => {
  const [success, fail] = [`${GET_CHAPTER}_SUCCESS`, `${GET_CHAPTER}_FAIL`];
  dispatch({ type: GET_CHAPTER, chapter_id });
  try {
    const activity = await chaptersAPI.get_chapter(activity_id, chapter_id);
    dispatch({ type: success, data: activity, chapter_id });
  } catch (error) {
    dispatch({ type: fail, error, chapter_id });
  }
};

const initialState = {
  37: {
    loading: false,
    data: null,
    error: null,
  },
};

export const chapters = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHAPTER:
      return {
        ...state,
        [action.chapter_id]: {
          data:
            typeof state[action.chapter_id] === "object" &&
            state[action.chapter_id].data,
          error: null,
          loading: true,
        },
      };
    case GET_CHAPTER_SUCCESS:
      return {
        ...state,
        [action.chapter_id]: {
          ...state[action.chapter_id],
          loading: false,
          error: null,
          data: action.data,
        },
      };
    case GET_CHAPTER_FAIL:
      return {
        ...state,
        [action.chapter_id]: {
          ...state[action.chapter_id],
          loading: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
};

export default chapters;
