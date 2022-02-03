import * as activitiesAPI from "@/api/activities";

// action types
const GET_ACTIVITIES = "activities/GET_ACTIVITIES";
const GET_ACTIVITIES_SUCCESS = "activities/GET_ACTIVITIES_SUCCESS";
const GET_ACTIVITIES_FAIL = "activities/GET_ACTIVITIES_FAIL";

const GET_ACTIVITY = "activities/GET_ACTIVITY";
const GET_ACTIVITY_SUCCESS = "activities/GET_ACTIVITY_SUCCESS";
const GET_ACTIVITY_FAIL = "activities/GET_ACTIVITY_FAIL";

const GET_CONTAINED_ACTIVITIES = "activities/GET_CONTAINED_ACTIVITIES";
const GET_CONTAINED_ACTIVITIES_SUCCESS =
  "activities/GET_CONTAINED_ACTIVITIES_SUCCESS";
const GET_CONTAINED_ACTIVITIES_FAIL =
  "activities/GET_CONTAINED_ACTIVITIES_FAIL";

// action creator function. action is also function(for handling Promise)
// it returns (dispatch)=>{}. redux-thunk gives dispatch and getState automatically
export const getActivities = () => async (dispatch) => {
  const [success, fail] = [
    `${GET_ACTIVITIES}_SUCCESS`,
    `${GET_ACTIVITIES}_FAIL`,
  ];
  dispatch({ type: GET_ACTIVITIES });
  try {
    const activities = await activitiesAPI.get_activities();
    dispatch({ type: success, data: activities });
  } catch (error) {
    dispatch({ type: fail, error });
  }
};

export const getContainedActivities = () => async (dispatch, getState) => {
  const [success, fail] = [
    `${GET_CONTAINED_ACTIVITIES}_SUCCESS`,
    `${GET_CONTAINED_ACTIVITIES}_FAIL`,
  ];
  dispatch({ type: GET_CONTAINED_ACTIVITIES });
  try {
    const token = getState().auth.accessToken;
    const activities = await activitiesAPI.get_contained_activities(token);
    dispatch({ type: success, data: activities });
  } catch (error) {
    dispatch({ type: fail, error });
  }
};

export const getActivity = (activity_id) => async (dispatch) => {
  const [success, fail] = [`${GET_ACTIVITY}_SUCCESS`, `${GET_ACTIVITY}_FAIL`];
  dispatch({ type: GET_ACTIVITY, activity_id });
  try {
    const activity = await activitiesAPI.get_activity(activity_id);
    dispatch({ type: success, data: activity, activity_id });
  } catch (error) {
    dispatch({ type: fail, error, activity_id });
  }
};

// initialState
const initialState = {
  activities: {
    data: [],
    loading: false,
    error: null,
  },
  activity: {
    37: {
      loading: false,
      data: null,
      error: null,
    },
  },
  containedActivities: {
    data: null,
    loading: false,
    error: null,
  },
};

const listStateHelper = (key, baseActionType) => (state, action) => {
  const [success, error] = [
    `${baseActionType}_SUCCESS`,
    `${baseActionType}_FAIL`,
  ];
  switch (action.type) {
    case baseActionType:
      return {
        ...state,
        [key]: {
          ...state[key],
          data: state[key].data,
          loading: true,
          error: null,
        },
      };
    case success:
      return {
        ...state,
        [key]: {
          ...state[key],
          loading: false,
          error: null,
          data: action.data.sort(function (a, b) {
            if (new Date(a.createDate) > new Date(b.createDate)) {
              return -1;
            } else if (new Date(a.createDate) < new Date(b.createDate)) {
              return 1;
            } else {
              return 0;
            }
          }),
        },
      };
    case error:
      return {
        ...state,
        [key]: {
          ...state[key],
          loading: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
};

// reducer
export const activities = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVITIES:
    case GET_ACTIVITIES_SUCCESS:
    case GET_ACTIVITIES_FAIL:
      return listStateHelper("activities", GET_ACTIVITIES)(state, action);
    case GET_CONTAINED_ACTIVITIES:
    case GET_CONTAINED_ACTIVITIES_SUCCESS:
    case GET_CONTAINED_ACTIVITIES_FAIL:
      return listStateHelper("containedActivities", GET_CONTAINED_ACTIVITIES)(
        state,
        action
      );
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

    default:
      return state;
  }
};

export default activities;
