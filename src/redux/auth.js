import { server_login } from "@/api/auth";

// action types
const LOGIN = "auth/LOGIN";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_FAIL = "auth/LOGIN_FAIL";

const SET_USER_DATA = "auth/SET_USER_DATA";
const REMOVE_USER_DATA = "auth/REMOVE_USER_DATA";

// export const get_activities = () => async (dispatch) => {
//   const [success, fail] = [
//     `${GET_ACTIVITIES}_SUCCESS`,
//     `${GET_ACTIVITIES}_FAIL`,
//   ];
//   try {
//     const activities = await activitiesAPI.getActivities();
//     dispatch({ type: success, payload: activities });
//   } catch (error) {
//     dispatch({ type: fail, error });
//   }
// };

export const login = () => async (dispatch) => {
  const [success, fail] = [`${LOGIN}_SUCCESS`, `${LOGIN}_FAIL`];
  try {
    const loginRes = await server_login();
  } catch (error) {
    dispatch();
  }
};
