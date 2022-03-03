import { activitiesAPI } from "@/api/";

import { changeActivityInput, removeActivityInput } from "./inputs";

import { formDateAsFormData } from "#serv";
import { startLoading, requestSuccess, requestFail } from "./loadings";

// action types
export const GET_ACTIVITIES = "activities/GET_ACTIVITIES";
const GET_ACTIVITY = "activities/GET_ACTIVITY";

const SET_ACTIVITIES = "activities/SET_ACTIVITIES";
const SET_ACTIVITY = "activities/SET_ACTIVITY";

export const GET_CONTAINED_ACTIVITIES = "activities/GET_CONTAINED_ACTIVITIES";
const SET_CONTAINED_ACTIVITIES = "activities/SET_CONTAINED_ACTIVITIES";

const CREATE_ACTIVITY = "activities/CREATE_ACTIVITY";
const UPDATE_ACTIVITY = "activities/UPDATE_ACTIVITY";
const DELETE_ACTIVITY = "activities/DELETE_ACTIVITY";

const JOIN_ACTIVITY = "submits/JOIN_ACTIVITY";
const QUIT_ACTIVITY = "submits/QUIT_ACTIVITY";

export const getActivities = () => async (dispatch) => {
  dispatch(startLoading(GET_ACTIVITIES));
  try {
    const activities = await activitiesAPI.get_activities();
    dispatch({ type: SET_ACTIVITIES, data: activities });
    dispatch(requestSuccess(GET_ACTIVITIES));
  } catch (error) {
    dispatch(requestFail(GET_ACTIVITIES, error));
  }
};

export const getContainedActivities = () => async (dispatch, getState) => {
  dispatch(startLoading(GET_CONTAINED_ACTIVITIES));
  try {
    const token = getState().auth.accessToken;
    const activities = await activitiesAPI.get_contained_activities(token);
    dispatch({ type: SET_CONTAINED_ACTIVITIES, data: activities });
    dispatch(requestSuccess(GET_CONTAINED_ACTIVITIES));
  } catch (error) {
    dispatch(requestFail(GET_CONTAINED_ACTIVITIES, error));
  }
};

export const getActivity = (activity_id) => async (dispatch) => {
  dispatch(startLoading(GET_ACTIVITY));
  try {
    const activity = await activitiesAPI.get_activity(activity_id);
    dispatch({ type: SET_ACTIVITY, data: activity, activity_id });
    dispatch(requestSuccess(GET_ACTIVITY));
  } catch (error) {
    dispatch(requestFail(GET_ACTIVITY, error));
  }
};

export const createActivity = (navigate) => async (dispatch, getState) => {
  dispatch(startLoading(CREATE_ACTIVITY));
  try {
    const createDate = formDateAsFormData(new Date());
    dispatch(
      changeActivityInput({
        name: "createDate",
        value: createDate,
      })
    );
    const author = getState().auth.user.pk;
    const activityInput = getState().inputs.activityInput;
    const data = await activitiesAPI.create_activity({
      ...activityInput,
      author,
      currentState: activityInput.currentState * 1,
    });
    dispatch(removeActivityInput());
    navigate(`/activities/${data.id}`);
    dispatch(requestSuccess(CREATE_ACTIVITY));
  } catch (error) {
    dispatch(requestFail(CREATE_ACTIVITY, error));
  }
};

export const updateActivity =
  (activity_id, navigate) => async (dispatch, getState) => {
    dispatch(startLoading(UPDATE_ACTIVITY));
    try {
      const activityInput = getState().inputs.activityInput;
      const data = await activitiesAPI.update_activity({
        ...activityInput,
        activity_id,
        currentState: activityInput.currentState * 1,
      });
      dispatch(removeActivityInput());
      dispatch(requestSuccess(UPDATE_ACTIVITY));
      navigate(`/activities/${data.id}`);
    } catch (error) {
      dispatch(requestFail(UPDATE_ACTIVITY, error));
    }
  };

export const deleteActivity =
  (activity_id, navigate) => async (dispatch, getState) => {
    dispatch(startLoading(DELETE_ACTIVITY));
    try {
      await activitiesAPI.delete_activity(activity_id);
      navigate(`/`);
      dispatch(getActivities());
      dispatch(requestSuccess(DELETE_ACTIVITY));
    } catch (error) {
      dispatch(requestFail(DELETE_ACTIVITY, error));
    }
  };

export const joinActivity =
  (activity_id, user_id) => async (dispatch, getState) => {
    dispatch(startLoading(JOIN_ACTIVITY));
    try {
      await activitiesAPI.join_activity({
        activity_id,
        user_id,
      });
      dispatch(getActivity(activity_id));
      dispatch(requestSuccess(JOIN_ACTIVITY));
    } catch (error) {
      dispatch(requestFail(JOIN_ACTIVITY, error));
    }
  };

export const quitActivity =
  (activity_id, user_id) => async (dispatch, getState) => {
    dispatch(startLoading(QUIT_ACTIVITY));
    try {
      await activitiesAPI.quit_activity({
        activity_id,
        user_id,
      });
      dispatch(getActivity(activity_id));
      dispatch(requestSuccess(QUIT_ACTIVITY));
    } catch (error) {
      dispatch(requestFail(QUIT_ACTIVITY, error));
    }
  };

// initialState
const initialState = {
  activities: [],
  activity: {
    37: null,
  },
  containedActivities: null,
};

// reducer
export const activities = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVITIES:
      return {
        ...state,
        activities: action.data,
      };
    case SET_ACTIVITY:
      return {
        ...state,
        activity: {
          [action.activity_id]: action.data,
        },
      };
    case SET_CONTAINED_ACTIVITIES:
      return {
        ...state,
        containedActivities: action.data,
      };
    default:
      return state;
  }
};

export default activities;
