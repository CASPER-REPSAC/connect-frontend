import React from 'react';

const SearchTypeInput = ({ onSearchTypeChange, searchType }) => {
  return (
    <div className="d-flex align-items-center">
      <select
        name="searchType"
        onChange={(e) => onSearchTypeChange(e)}
        value={searchType}
      >
        <option value="all">all</option>
        <option value="chapter">chapter</option>
        <option value="activity">acitivity</option>
      </select>
    </div>
  );
};

export default SearchTypeInput;
