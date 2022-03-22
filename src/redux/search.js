import { searchAPI } from "@/api";
import { startLoading, requestSuccess, requestFail } from "./loadings";
import { changeSearchInput } from "./inputs";

// action types
export const GET_SEARCH_RESULT = "search/GET_SEARCH_RESULT";
export const GET_USER_SEARCH_RESULT = "search/GET_USER_SEARCH_RESULT";
const SET_SEARCH_RESULT = "search/SET_SEARCH_RESULT";
const SET_USER_SEARCH_RESULT = "search/SET_USER_SEARCH_RESULT";

// action creators
export const getSearchResult = () => async (dispatch, getState) => {
  const {
    keyword,
    type: search_type,
    page_number,
    lastRequestKeyword,
  } = getState().inputs.searchInput;

  dispatch(startLoading(GET_SEARCH_RESULT));
  try {
    let payload = { keyword, search_type, page_number };
    if (lastRequestKeyword !== keyword) {
      payload = {
        ...payload,
        page_number: 1,
      };
    }
    const searchResult = await searchAPI.get_search_result(payload);
    dispatch({ type: SET_SEARCH_RESULT, payload: searchResult });
    dispatch(
      changeSearchInput({ name: "lastRequestKeyword", value: keyword || "" })
    );
    dispatch(requestSuccess(GET_SEARCH_RESULT));
  } catch (e) {
    dispatch(requestFail(GET_SEARCH_RESULT));
  }
};

export const getUserSearchResult =
  (user_email) => async (dispatch, getState) => {
    dispatch(startLoading(GET_USER_SEARCH_RESULT));
    try {
      const searchResult = await searchAPI.get_user_search_result(user_email);
      dispatch({ type: SET_USER_SEARCH_RESULT, payload: searchResult });
      dispatch(requestSuccess(GET_USER_SEARCH_RESULT));
    } catch (e) {
      dispatch(requestFail(GET_USER_SEARCH_RESULT));
    }
  };

// initial State
const initialState = {
  searchResult: null,
  userSearchResult: null,
};

// reducer
function search(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_RESULT:
      return {
        ...state,
        searchResult: action.payload,
      };

    case SET_USER_SEARCH_RESULT:
      return {
        ...state,
        userSearchResult: action.payload,
      };
    default:
      return state;
  }
}

export default search;
