const SHOW_ALERT = "alerts/SHOW_ALERT";
const HIDE_ALERT = "alerts/HIDE_ALERT";
const SET_ERROR = "alerts/SET_ERROR";

export const showAlert = () => ({ type: SHOW_ALERT });
export const hideAlert = () => ({ type: HIDE_ALERT });

export const setError = (breif, detail) => (dispatch) => {
  dispatch({ type: SET_ERROR, breif, detail });
  dispatch(showAlert());
};

const initialState = {
  show: false,
  message: "",
  error: {
    brief: "",
    detail: {},
  },
};

export const alerts = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return { ...state, show: true };
    case HIDE_ALERT:
      return { ...state, show: false };
    case SET_ERROR:
      return {
        ...state,
        message: "오류 발생",
        code: null,
        error: {
          brief: action.breif,
          detail: {
            data: action.detail.data || null,
            status: action.detail.status || null,
            statusText: action.detail.statusText || null,
          },
        },
      };
    default:
      return state;
  }
};

export default alerts;
