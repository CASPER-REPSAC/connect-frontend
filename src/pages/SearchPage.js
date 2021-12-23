import React, { useState, useEffect } from 'react';
import { getSearchResult } from '../modules/api';
// import { NoCards } from '../components/common/NoCards';

const SearchPage = ({ match }) => {
  const [searchResult, setSearchResult] = useState();
  const [searchType, setSearchType] = useState('activity');
  console.log(match);
  useEffect(() => {
    //   getSearchResult = async (keyword, search_type, setState)
    getSearchResult(match.params.keyword, searchType, setSearchResult);
  }, []);
  return <div>{JSON.stringify(searchResult)}</div>;
};

export default React.memo(SearchPage);
