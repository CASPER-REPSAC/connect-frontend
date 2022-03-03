import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResult } from "@/redux/search";
import { changeSearchInput } from "@/redux/inputs";
import { useSearch } from "@/hooks";
import { Card } from "#comp/common";
import { ActivityChapterList } from "#comp/activities/ActivityChapterList";

export const SearchPage = () => {
  const {
    keyword,
    type: search_type,
    page_number,
    requestCounter,
    sendSearchRequest,
    onChangeSearchInput,
    lastRequestKeyword,
  } = useSearch();

  const searchResult = useSelector((state) => state.search.searchResult);

  return (
    <div className="p-2 h-full w-full flex justify-center">
      <Card.Frame
        expended="true"
        className="hover:bg-background-50 hover:shadow-none w-full sm:w-[500px] md:w-[650px] lg:w-[900px]"
      >
        <div className="flex justify-between">
          <input
            className="text-3xl editable-placeholder w-full mr-1"
            spellCheck={false}
            placeholder="검색어를 입력하세요"
            onChange={(e) => {
              onChangeSearchInput({
                name: "keyword",
                value: e.target.value,
              });
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendSearchRequest();
              }
            }}
          />

          <button
            className="flex-none bg-background-700 text-text-50 px-2 py-1 rounded h-fit"
            onClick={() => {
              sendSearchRequest();
            }}
          >
            검색
          </button>
        </div>
        {searchResult?.searched_objects && (
          <>
            <div className="flex justify-between items-center">
              <h3 className="my-3">
                {lastRequestKeyword} 검색결과 (
                {searchResult.searched_objects_count})
              </h3>
              <div>
                <select
                  name="type"
                  id="type"
                  className="connect-input "
                  value={search_type}
                  onChange={(e) => {
                    onChangeSearchInput(e.target);
                    sendSearchRequest();
                  }}
                >
                  <option value="all">all</option>
                  <option value="activity">activity</option>
                  <option value="chapter">chapter</option>
                </select>
              </div>
            </div>
            <div>
              <ActivityChapterList cards={searchResult.searched_objects} />
            </div>

            <div className="flex justify-center gap-1 my-3">
              {[...Array(searchResult.page_end_index)].map(
                (pageButton, index) => (
                  <button
                    className={
                      "text-center w-9 h-9 rounded " +
                      (searchResult.page_index === index + 1
                        ? "bg-background-800 text-text-50"
                        : "bg-background-200 text-text-800")
                    }
                    onClick={() => {
                      onChangeSearchInput({
                        name: "page_number",
                        value: index + 1,
                      });
                      sendSearchRequest();
                    }}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </Card.Frame>
    </div>
  );
};

export default SearchPage;
