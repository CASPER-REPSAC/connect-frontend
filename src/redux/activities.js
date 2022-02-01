import * as activitiesAPI from "@/api/activities";

// action types
const GET_ACTIVITIES = "activities/GET_ACTIVITIES";
const GET_ACTIVITIES_SUCCESS = "activities/GET_ACTIVITIES_SUCCESS";
const GET_ACTIVITIES_FAIL = "activities/GET_ACTIVITIES_FAIL";
const GET_ACTIVITY = "activities/GET_ACTIVITY";
const GET_ACTIVITY_SUCCESS = "activities/GET_ACTIVITY_SUCCESS";
const GET_ACTIVITY_FAIL = "activities/GET_ACTIVITY_FAIL";

const GET_CHAPTER = "activities/GET_CHAPTER";
const GET_CHAPTER_SUCCESS = "activities/GET_CHAPTER_SUCCESS";
const GET_CHAPTER_FAIL = "activities/GET_CHAPTER_FAIL";
// action creator function. action is also function(for handling Promise)
// it returns (dispatch)=>{}. redux-thunk gives dispatch and getState automatically
export const get_activities = () => async (dispatch) => {
  const [success, fail] = [
    `${GET_ACTIVITIES}_SUCCESS`,
    `${GET_ACTIVITIES}_FAIL`,
  ];
  dispatch({ type: GET_ACTIVITIES });
  try {
    const activities = await activitiesAPI.getActivities();
    dispatch({ type: success, data: activities });
  } catch (error) {
    dispatch({ type: fail, error });
  }
};

export const get_activity = (activity_id) => async (dispatch) => {
  const [success, fail] = [`${GET_ACTIVITY}_SUCCESS`, `${GET_ACTIVITY}_FAIL`];
  dispatch({ type: GET_ACTIVITY, activity_id });
  try {
    const activity = await activitiesAPI.getActivity(activity_id);
    dispatch({ type: success, data: activity, activity_id });
  } catch (error) {
    dispatch({ type: fail, error, activity_id });
  }
};

export const get_chapter = (activity_id, chapter_id) => async (dispatch) => {
  const [success, fail] = [`${GET_CHAPTER}_SUCCESS`, `${GET_CHAPTER}_FAIL`];
  dispatch({ type: GET_ACTIVITY, chapter_id });
  try {
    const activity = await activitiesAPI.getChapter(activity_id, chapter_id);
    dispatch({ type: success, data: activity, chapter_id });
  } catch (error) {
    dispatch({ type: fail, error, chapter_id });
  }
};

// initialState
const initialState = {
  activities: {
    data: [],
    loading: false,
    error: false,
  },
  activity: {
    37: {
      loading: false,
      data: null,
      error: null,
    },
  },
  chapter: {
    37: {
      loading: false,
      data: null,
      error: null,
    },
  },
};

// reducer
export const activities = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: {
          ...state.activities,
          // data는 기존 값을 유지하도록 함.
          loading: true,
          error: null,
        },
      };
    case GET_ACTIVITIES_SUCCESS:
      return {
        ...state,
        activities: {
          loading: false,
          data: action.data.sort(function (a, b) {
            if (new Date(a.createDate) > new Date(b.createDate)) {
              return -1;
            } else if (new Date(a.createDate) < new Date(b.createDate)) {
              return 1;
            } else {
              return 0;
            }
          }),
          error: null,
        },
      };
    case GET_ACTIVITIES_FAIL:
      return {
        ...state,
        activities: {
          ...state.activities,
          loading: false,
          error: action.error,
        },
      };
    case GET_ACTIVITY:
      return {
        ...state,
        activity: {
          ...state.activity,
          [action.activity_id]: {
            data:
              typeof state.activity[action.activity_id] === "object" &&
              state.activity[action.activity_id].data,
            error: null,
            loading: true,
          },
        },
      };
    case GET_ACTIVITY_SUCCESS:
      return {
        ...state,
        activity: {
          ...state.activity,
          [action.activity_id]: {
            ...state.activity[action.activity_id],
            loading: false,
            error: null,
            data: action.data,
          },
        },
      };
    case GET_ACTIVITY_FAIL:
      return {
        ...state,
        activity: {
          ...state.activity,
          [action.activity_id]: {
            ...state.activity[action.activity_id],
            loading: false,
            error: action.error,
          },
        },
      };
    case GET_CHAPTER:
      return {
        ...state,
        chapter: {
          ...state.chapter,
          [action.chapter_id]: {
            data:
              typeof state.chapter[action.chapter_id] === "object" &&
              state.chapter[action.chapter_id].data,
            error: null,
            loading: true,
          },
        },
      };
    case GET_CHAPTER_SUCCESS:
      return {
        ...state,
        chapter: {
          ...state.chapter,
          [action.chapter_id]: {
            ...state.chapter[action.chapter_id],
            loading: false,
            error: null,
            data: action.data,
          },
        },
      };
    case GET_CHAPTER_FAIL:
      return {
        ...state,
        chapter: {
          ...state.chapter,
          [action.chapter_id]: {
            ...state.chapter[action.chapter_id],
            loading: false,
            error: action.error,
          },
        },
      };
    default:
      return state;
  }
};

export default activities;
