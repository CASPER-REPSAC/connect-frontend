import styled from 'styled-components';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const StyledSearchbar = styled.div`
  display: flex;
  align-items: center;
`;

const SearchbarInput = styled.input`
  padding: 5px;
  font-size: 12px;
  border: none;
  transition: 130ms ease-in-out;
  border-bottom: 1px solid lightgray;
  &:focus {
    outline: none;
    background: none;
    border-bottom: 1px solid black;
  }
  &:hover {
    border-bottom: 1px solid black;
  }
`;

const Searchbar = () => {
  const [searchWord, setSearchWord] = useState();
  const history = useHistory();
  const onClick = (e) => {
    if (searchWord) {
      history.push(`/search/${searchWord}`);
    }
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };
  const onChange = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <StyledSearchbar>
      <SearchbarInput
        type="text"
        id="search-input"
        value={searchWord || ''}
        onChange={(e) => onChange(e)}
        onKeyPress={(e) => onKeyPress(e)}
      />

      <label htmlFor="search-input">
        <FontAwesomeIcon icon={faSearch} onClick={(e) => onClick(e)} />
      </label>
    </StyledSearchbar>
  );
};

export default Searchbar;
