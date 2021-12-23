import React, { useState, useEffect } from 'react';
import CommentForm from '../write/CommentForm';
import { submitComment, deleteComment } from '../../modules/api';
import Button from './Button';
import { useSelector } from 'react-redux';
import '../../styles/Comment.scss';

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
            <h6>{comment.user}</h6>
            <div className="d-flex justify-content-between ">
              <div className="text-break">{comment.comment}</div>
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

  const [commentInput, setCommentInput] = useState({
    comment: '',
    activityid: activityId,
    chapterid: chapterId,
    writer: null,
  });

  useEffect(() => {
    setCommentInput({ ...commentInput, writer: user.pk });
  }, [user]);

  const inputHandler = ({ target }) => {
    setCommentInput({ ...commentInput, comment: target.value });
  };
  const onSubmitComment = () => {
    submitComment(commentInput);
  };

  return (
    <div className="comment">
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
