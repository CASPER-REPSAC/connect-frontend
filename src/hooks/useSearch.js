import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResult, GET_SEARCH_RESULT } from "@/redux/search";
import { changeSearchInput } from "@/redux/inputs";
import { useNavigate } from "react-router-dom";

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

export const useSearchButton = () => {
  const { keyword, type, requestCounter } = useSelector(
    (state) => state.inputs.searchInput
  );
  const dispatch = useDispatch();
  const searchInput = useRef();

  const onKeywordChange = (e) => {
    dispatch(changeSearchInput(e.target));
  };
  const onHover = () => {
    searchInput.current.focus();
  };
  const onMouseLeave = () => {
    searchInput.current.blur();
  };

  const onIconClick = () => {
    dispatch(
      changeSearchInput({ name: "requestCounter", value: requestCounter + 1 })
    );
  };

  const navigate = useNavigate();

  const onEnter = (e) => {
    if (e.key === "Enter") {
      dispatch(changeSearchInput(e.target));
      navigate(`/search`);
      if (keyword !== "") dispatch(getSearchResult());
    }
  };

  return {
    onHover,
    onMouseLeave,
    onEnter,
    onIconClick,
    onKeywordChange,
    searchInput,
  };
};
