import React, { useState, useEffect } from 'react';
import CommentForm from '../write/CommentForm';
import { submitComment, deleteComment } from '../../modules/api';
import Button from './Button';
import { useSelector } from 'react-redux';
import '../../styles/Comment.scss';
import { AskReqModal } from './ResModal';

const CommentList = ({ comments, user, increateReqTrigger }) => {
  const [reqModal, setReqModal] = useState({
    msg: '삭제하시겠습니까?',
    onRequest: undefined,
    res: undefined,
    show: false,
    handleClose: undefined,
    onSuccess: undefined,
  });
  const [writeRes, setWriteRes] = useState(undefined);
  useEffect(() => {
    setReqModal({ ...reqModal, res: writeRes });
  }, [writeRes]);

  const handleClose = () => {
    setReqModal({ ...reqModal, show: false });
  };

  async function onDeleteActivity(commentpk) {
    console.log('delete');
    const onRequest = async () => {
      console.log('delete request');
      await deleteComment(commentpk, setWriteRes);
    };
    const onSuccess = () => {
      increateReqTrigger();
    };
    setReqModal({
      ...reqModal,
      handleClose: handleClose,
      res: writeRes,
      onRequest: onRequest,
      msg: '삭제하시겠습니까?',
      show: true,
      onSuccess: onSuccess,
    });
  }

  return (
    <div>
      {comments.map((comment, index) => {
        return (
          <div
            key={index}
            className="p-3 d-flex justify-content-between"
            style={{ borderTop: '1px solid lightgray' }}
          >
            <div>
              <div className="mb-1">
                <b>{comment.user}</b>
              </div>
              <div className="">
                <div className="text-break">{comment.comment}</div>
              </div>
            </div>
            {comment.writer === user.pk && (
              <div
                className="d-flex justify-content-end align-items-center"
                style={{ flex: '1' }}
              >
                <Button
                  width="57px"
                  margin="0 5px"
                  height="fit-content"
                  background="#8B0000"
                  onClick={() => onDeleteActivity(comment.commentpk)}
                >
                  삭제
                </Button>
              </div>
            )}
          </div>
        );
      })}
      <AskReqModal
        show={reqModal.show}
        handleClose={reqModal.handleClose}
        msg={reqModal.msg}
        onRequest={reqModal.onRequest}
        res={reqModal.res}
        onSuccess={reqModal.onSuccess}
      />
    </div>
  );
};

const Comment = ({ activityId, chapterId, comments, increateReqTrigger }) => {
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
  const onSubmitComment = async () => {
    await submitComment(commentInput);
    increateReqTrigger();
    setCommentInput({ ...commentInput, comment: '' });
  };

  return (
    <div className="comment">
      <CommentForm
        commentInput={commentInput}
        inputHandler={inputHandler}
        submitComment={onSubmitComment}
      />
      {comments && Array.isArray(comments) && (
        <CommentList
          comments={comments}
          user={user}
          increateReqTrigger={increateReqTrigger}
        />
      )}
    </div>
  );
};

export default Comment;
