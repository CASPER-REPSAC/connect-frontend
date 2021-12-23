import React from 'react';
import Button from '../common/Button';

const PagingButton = ({ pageSize, pageIndex, pageEndIndex, setPageIndex }) => {
  const arr = Array.from({ length: pageEndIndex }, () => 0);
  return (
    <div className="d-flex justify-content-center align-items-center w-100 p-3">
      {arr.map((index) => {
        return (
          <Button
            key={index}
            onClick={() => setPageIndex(index + 1)}
            background={index + 1 === pageIndex ? null : 'white'}
            border={index + 1 === pageIndex ? null : '1px solid black'}
            color={index + 1 === pageIndex ? null : 'black'}
          >
            {index + 1}
          </Button>
        );
      })}
    </div>
  );
};

export default PagingButton;
