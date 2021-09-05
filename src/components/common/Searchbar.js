import styled from 'styled-components';
import Button from './Button';

const StyledSearchbar = styled.div`
  display: flex;
  align-items: center;
`;

const SearchbarInput = styled.input`
  padding: 3px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid #a0a0b0;
  &:focus {
    outline: none;
  }
`;

const Searchbar = () => {
  return (
    <StyledSearchbar>
      <form>
        <SearchbarInput type="text" />
        <Button>search</Button>
      </form>
    </StyledSearchbar>
  );
};

export default Searchbar;
