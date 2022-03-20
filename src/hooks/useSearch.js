import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResult, GET_SEARCH_RESULT } from "@/redux/search";
import { changeSearchInput } from "@/redux/inputs";

export const useSearch = () => {
  const {
    keyword,
    type: search_type,
    page_number,
    requestCounter,
    lastRequestKeyword,
  } = useSelector((state) => state.inputs.searchInput);

  const searchLoading = useSelector(
    (state) => state.loadings[GET_SEARCH_RESULT]
  );

  const dispatch = useDispatch();

  const sendSearchRequest = useCallback(() => {
    if (keyword !== "") dispatch(getSearchResult());
  }, [dispatch, keyword]);

  const onChangeSearchInput = (target) => {
    dispatch(changeSearchInput(target));
  };

  return {
    keyword,
    type: search_type,
    page_number,
    requestCounter,
    lastRequestKeyword,
    sendSearchRequest,
    onChangeSearchInput,
    searchLoading,
  };
};
