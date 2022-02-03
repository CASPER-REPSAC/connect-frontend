import { server_login } from "@/api/auth";
import { Cookies } from "react-cookie";
import { setError } from "./alerts";
import jwt from "jwt-decode";

const cookies = new Cookies();

// action types
const LOGIN = "auth/LOGIN";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_FAIL = "auth/LOGIN_FAIL";

const SET_GOOGLE_TOKEN = "auth/SET_GOOGLE_TOKEN";
const LOGOUT = "auth/LOGOUT";

export const login = () => async (dispatch, getState) => {
  const [success, fail] = [`${LOGIN}_SUCCESS`, `${LOGIN}_FAIL`];
  const googleToken = getState().auth.googleToken;

  dispatch({ type: LOGIN });
  try {
    const { access_token, refresh_token, profile, user } = await server_login(
      googleToken
    );
    cookies.set("access_token", access_token, {
      path: "/",
    });
    cookies.set("refresh_token", refresh_token, {
      httpOnly: true,
      path: "/",
    });
    dispatch({ type: success, user, profile, access_token });
  } catch (error) {
    dispatch({ type: fail, error });
    dispatch(setError(error.message, error.response));
  }
};

export const logout = () => (dispatch) => {
  cookies.remove("access_token");
  window.localStorage.removeItem("googleToken");
  dispatch({ type: LOGOUT });
};

export const loginStart = () => ({ type: LOGIN });
export const loginFail = (error) => ({ type: LOGIN_FAIL, error });

export const loginWithCookie = () => async (dispatch) => {
  const access_token = cookies.get("access_token");
  if (!access_token) {
    dispatch(logout());
    return;
  }
  const accessTokenExp = jwt(access_token).exp || 0;
  const isExp = new Date(accessTokenExp * 1000) < new Date();
  if (isExp) {
    dispatch(logout());
  } else {
    const googleToken = window.localStorage.getItem("googleToken");
    dispatch(setGoogleToken(googleToken));
    dispatch(login());
  }
};

export const setGoogleToken = (token) => (dispatch) => {
  window.localStorage.setItem("googleToken", token);
  dispatch({ type: SET_GOOGLE_TOKEN, token });
};

const initialState = {
  loading: false,
  error: null,
  user: null,
  accessToken: null,
  googleToken: null,
  profile: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
        profile: action.profile,
        accessToken: "Bearer " + action.access_token,
      };
    case LOGIN_FAIL:
      return {
        loading: false,
        user: null,
        error: action.error,
        googleToken: null,
        profile: null,
        accessToken: null,
      };
    case LOGOUT:
      return {
        loading: false,
        error: null,
        user: null,
        googleToken: null,
        accessToken: null,
        profile: null,
      };
    case SET_GOOGLE_TOKEN:
      return { ...state, googleToken: action.token };
    default:
      return state;
  }
};

export default auth;
