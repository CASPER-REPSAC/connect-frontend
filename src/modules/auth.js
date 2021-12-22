import { createAction, handleActions } from 'redux-actions';

const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGOUT = 'auth/LOGOUT';

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  userData,
});
export const logout = (user) => ({
  type: LOGOUT,
  user,
});

const initialState = {
  user: {
    email: null,
    first_name: null,
    last_name: null,
    pk: null,
    access_token: null,
    refresh_token: null,
  },
};

// const auth = handleActions({}, initialState);

function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        user: {
          email: action.userData.email,
          first_name: action.userData.first_name,
          last_name: action.userData.last_name,
          pk: action.userData.pk,
          access_token: action.userData.access_token,
          refresh_token: action.userData.refresh_token,
        },
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default auth;
