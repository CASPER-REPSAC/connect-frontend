const REMOVE_ERROR = "submits/REMOVE_ERROR";
const START_LOADING = "submits/START_LOADING";
const REQUEST_FAIL = "submits/REQUEST_FAIL";
const REQUEST_SUCCESS = "submits/REQUEST_SUCCESS";

export const removeError = (key) => {
  return { type: REMOVE_ERROR, key };
};

export const startLoading = (key) => ({ type: START_LOADING, key });
export const requestSuccess = (key) => ({ type: REQUEST_SUCCESS, key });
export const requestFail = (key, error) => ({ type: REQUEST_FAIL, key, error });

const loadingStates = {
  loadingStart: {
    loading: true,
    error: null,
  },
  requestSuccess: {
    loading: false,
    error: null,
  },
};

const initialState = {};

export const loadings = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, [action.key]: loadingStates.loadingStart };
    case REQUEST_FAIL:
      return {
        ...state,
        [action.key]: { loading: false, error: action.error },
      };
    case REQUEST_SUCCESS:
      return { ...state, [action.key]: loadingStates.loadingSuccess };
    default:
      return state;
  }
};

export default loadings;
