import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResult } from "@/redux/search";
import { changeSearchInput } from "@/redux/inputs";

export const useSearch = () => {
  const {
    keyword,
    type: search_type,
    page_number,
    requestCounter,
    lastRequestKeyword,
  } = useSelector((state) => state.inputs.searchInput);

  const dispatch = useDispatch();

  const sendSearchRequest = useCallback(() => {
    dispatch(getSearchResult());
  }, [dispatch]);

  const onChangeSearchInput = (target) => {
    dispatch(changeSearchInput(target));
  };

  useEffect(() => {
    sendSearchRequest();
  }, [sendSearchRequest]);

  return {
    keyword,
    type: search_type,
    page_number,
    requestCounter,
    lastRequestKeyword,
    sendSearchRequest,
    onChangeSearchInput,
  };
};
