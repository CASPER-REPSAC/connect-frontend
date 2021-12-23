import React from 'react';
import Button from '../common/Button';

const CommentForm = ({ commentInput, inputHandler, submitComment }) => {
  return (
    <div className="chapter-form">
      {console.log('chapterfore')}

      <label htmlFor="article">
        <h6>Comment</h6>
      </label>
      <br />
      <textarea
        type="text"
        id="article"
        name="article"
        onChange={(e) => inputHandler(e)}
        value={commentInput.comment || ''}
      ></textarea>
      <br />

      <div className="d-flex justify-content-end">
        <Button onClick={() => submitComment()}>댓글 작성</Button>
      </div>
      <br />
    </div>
  );
};

export default CommentForm;
