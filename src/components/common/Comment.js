import React, { useState, useEffect } from 'react';
import CommentForm from '../write/CommentForm';
import { submitComment, deleteComment } from '../../modules/api';
import Button from './Button';
import { useSelector } from 'react-redux';

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, index) => {
        return (
          <div
            key={index}
            className="p-3"
            style={{ borderTop: '1px solid gray' }}
          >
            <div className="d-flex justify-content-between ">
              <div>{comment.comment}</div>
              <small className="text-muted">{comment.user}</small>
            </div>
            <div className="d-flex justify-content-end">
              <Button
                width="content-fit"
                background="#8B0000"
                onClick={() => deleteComment(comment.commentpk)}
              >
                삭제
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Comment = ({ activityId, chapterId, comments }) => {
  // {comment, activityid, chapterid, createtime, writer(accessToken)};

  const { user } = useSelector((state) => ({ user: state.auth.user }));
  const { pk } = user;

  const [commentInput, setCommentInput] = useState({
    comment: '',
    activityid: activityId,
    chapterid: chapterId,
    writer: null,
  });

  useEffect(() => {
    setCommentInput({ ...commentInput, writer: pk });
  }, []);

  const inputHandler = ({ target }) => {
    setCommentInput({ ...commentInput, comment: target.value });
  };
  const onSubmitComment = () => {
    submitComment(commentInput);
  };

  return (
    <div>
      <CommentForm
        commentInput={commentInput}
        inputHandler={inputHandler}
        submitComment={onSubmitComment}
      />
      {comments && Array.isArray(comments) && (
        <CommentList comments={comments} />
      )}
    </div>
  );
};

export default Comment;