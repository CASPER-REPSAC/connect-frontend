import { handleActions } from 'redux-actions';
import {
  getActivity,
  getTag,
  getUsers,
  getListData,
  getDataByURL,
  getUserContainedList,
} from './api';

// action types
const SET_ACTIVITIES = 'activities/GET_ACTIVITIES';
const SET_CONTAINED_ACTIVITIES = 'activities/SET_CONTAINED_ACTIVITIES';

// action genarator functions
export const getActivites = () => (dispatch) => {
  return getListData('/activities/')
    .then((response) => {
      console.log(response);
      dispatch({
        type: SET_ACTIVITIES,
        payload: response['results'],
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const setContainedActivities = (activities) => ({
  type: SET_CONTAINED_ACTIVITIES,
  activities,
});
// id, type, title, author, createdDate, content, currentState, startDate, endDate
// initial state

const initialState = {
  containedActivities: undefined,
  // 참여중인 액티비티
  allActivities: undefined,
  // 모든 액티비티(딱히 필요한가는 애매함)
  test: 1,
};

// reducers
const activities = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTAINED_ACTIVITIES:
      return { ...state, containedActivities: action.activities };
    default:
      return state;
  }
};

// export
export default activities;
