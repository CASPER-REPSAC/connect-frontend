import React, { useState, useEffect } from 'react';
import { getSearchResult } from '../modules/api';
import { NoCards } from '../components/common/NoCards';
import CardList from '../components/card/CardList';
import PagingButton from '../components/search/PagingButton';
import SearchTypeInput from '../components/search/SearchTypeInput';

const SearchPage = ({ match }) => {
  const [searchResult, setSearchResult] = useState();
  const [searchType, setSearchType] = useState('all');
  const [pageIndex, setPageIndex] = useState(1);
  console.log(match);
  useEffect(() => {
    //   getSearchResult = async (keyword, search_type, setState)
    getSearchResult(
      match.params.keyword,
      searchType,
      setSearchResult,
      pageIndex,
    );
  }, [pageIndex, match, searchType]);

  const onSearchTypeChange = ({ target }) => {
    console.log(target.value);
    setSearchType(target.value);
  };

  return (
    <div className="w-100">
      {/* pageSize, pageIndex, pageEndIndex, setPageIndex  */}
      {searchResult && (
        <>
          <div className="d-flex justify-content-between">
            <h4>"{match.params.keyword}" 검색결과</h4>
            {/* 서치타입 선택 인풋 */}
            <SearchTypeInput
              onSearchTypeChange={onSearchTypeChange}
              searchType={searchType}
            />
          </div>
          <hr />
          {searchResult.searched_objects_count === 0 ? (
            <div className="p-3">
              <NoCards msg="검색결과가 없습니다." />
            </div>
          ) : (
            <CardList cards={searchResult.searched_objects} />
          )}
          <PagingButton
            pageIndex={pageIndex}
            pageSize={searchResult.page_size}
            pageEndIndex={searchResult.page_end_index}
            setPageIndex={setPageIndex}
          />
        </>
      )}
      <div className="text-break">{JSON.stringify(searchResult)}</div>
    </div>
  );
};

export default React.memo(SearchPage);
