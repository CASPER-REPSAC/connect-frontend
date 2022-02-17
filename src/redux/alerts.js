const SHOW_ALERT = "alerts/SHOW_ALERT";
const HIDE_ALERT = "alerts/HIDE_ALERT";
const SET_ERRORS = "alerts/SET_ERRORS";
const SET_LOADINGS = "alerts/SET_LOADINGS";

export const showAlert = () => ({ type: SHOW_ALERT });
export const hideAlert = () => ({ type: HIDE_ALERT });

export const setLoading = (loadings) => ({ type: SET_LOADINGS, loadings });
export const setErrors = (errors) => ({ type: SET_ERRORS, errors });

const initialState = {
  show: true,
  loadings: [],
  errors: [],
};

export const alerts = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return { ...state, show: true };
    case HIDE_ALERT:
      return { ...state, show: false };
    case SET_LOADINGS:
      return { ...state, loadings: action.loadings };
    case SET_ERRORS:
      return { ...state, loadings: action.errors };
    default:
      return state;
  }
};

export default alerts;
