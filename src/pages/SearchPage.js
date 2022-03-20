import React from "react";
import { useSelector } from "react-redux";
import { useSearch } from "@/hooks";
import { Card, Muted } from "#comp/common";
import { ActivityChapterList } from "#comp/activities/ActivityChapterList";

const SearchTitle = ({ searchResult }) => {
  const {
    type: search_type,
    sendSearchRequest,
    onChangeSearchInput,
    lastRequestKeyword,
    searchLoading,
  } = useSearch();
  return (
    <div className="flex justify-between items-center">
      <h3 className="my-3">
        {lastRequestKeyword} 검색결과 ({searchResult.searched_objects_count})
        <Muted> {searchLoading?.loading && "로딩중.."}</Muted>
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
  );
};

const SearchInput = () => {
  const { sendSearchRequest, onChangeSearchInput } = useSearch();
  return (
    <div className="flex justify-between">
      <input
        className="text-xl p-1 editable-placeholder w-full mr-1"
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
  );
};

const SearchSliceButton = ({ searchResult }) => {
  const { sendSearchRequest, onChangeSearchInput } = useSearch();
  return (
    <div className="flex justify-center gap-1 my-3">
      {[...Array(searchResult.page_end_index)].map((pageButton, index) => (
        <button
          key={index}
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
      ))}
    </div>
  );
};

export const SearchPage = () => {
  const searchResult = useSelector((state) => state.search.searchResult);

  return (
    <div className="p-2 h-full w-full flex justify-center">
      <Card.Frame
        expended="true"
        className="hover:bg-background-50 hover:shadow-none w-full sm:w-[500px] md:w-[650px] lg:w-[900px]"
      >
        <SearchInput />
        {searchResult?.searched_objects && (
          <>
            <SearchTitle searchResult={searchResult} />
            <div>
              <ActivityChapterList cards={searchResult.searched_objects} />
            </div>
            <SearchSliceButton searchResult={searchResult} />
          </>
        )}
      </Card.Frame>
    </div>
  );
};

export default SearchPage;
