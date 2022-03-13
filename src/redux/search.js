import { searchAPI } from "@/api";
import { startLoading, requestSuccess, requestFail } from "./loadings";
import { changeSearchInput } from "./inputs";

// action types
const GET_SEARCH_RESULT = "search/GET_SEARCH_RESULT";
const SET_SEARCH_RESULT = "search/SET_SEARCH_RESULT";

// action creators
export const getSearchResult = () => async (dispatch, getState) => {
  const {
    keyword,
    type: search_type,
    page_number,
  } = getState().inputs.searchInput;

  dispatch(startLoading(GET_SEARCH_RESULT));
  try {
    const searchResult = await searchAPI.get_search_result({
      keyword,
      search_type,
      page_number,
    });
    dispatch({ type: SET_SEARCH_RESULT, payload: searchResult });
    dispatch(
      changeSearchInput({ name: "lastRequestKeyword", value: keyword || "" })
    );
    dispatch(requestSuccess(GET_SEARCH_RESULT));
  } catch (e) {
    dispatch(requestFail(GET_SEARCH_RESULT));
  }
};

// initial State
const initialState = {
  searchResult: null,
};

// reducer
function search(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_RESULT:
      return {
        ...state,
        searchResult: action.payload,
      };
    default:
      return state;
  }
}

export default search;
