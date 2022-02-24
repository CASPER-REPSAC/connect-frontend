import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { isArray } from "#serv";
import { useSelector, useDispatch } from "react-redux";
import { changeCommentInput } from "@/redux/inputs";
import { createComment, deleteComment } from "@/redux/submits";
import { SubmitButton, WithToolTip, CommentRemoveButton } from "#comp/common";
import { TrashCanSVG } from "@/icons";

const CommentInput = ({ dispatch }) => {
  const { activity_id, chapter_id } = useParams();
  const comment = useSelector(
    (state) => state.inputs.commentInput[chapter_id] || ""
  );
  const onChange = (e) => {
    dispatch(changeCommentInput(chapter_id, e.target.value));
  };

  const onSubmit = useCallback(() => {
    dispatch(createComment(activity_id, chapter_id));
  }, [dispatch, activity_id, chapter_id]);
  return (
    <>
      <div className="flex gap-1">
        <textarea
          onChange={onChange}
          className="p-1 text-sm focus:outline-none border border-text-300 bg-text-50  rounded w-full min-h-commentInput"
          value={comment || ""}
        />

        <SubmitButton onClick={onSubmit} />
      </div>
    </>
  );
};

export const CommentListItem = ({ comment, user, dispatch }) => {
  const {
    activityid,
    chapterid,
    commentpk,
    comment: content,
    writer: writerpk,
    createtime,
    user: email,
    profile,
  } = comment;
  console.log("comment", user);
  return (
    <div className="p-3 xl:p-3 flex gap-x-2  border-t border-text-300 w-full">
      <img
        src={profile.picture}
        alt="error"
        className="rounded w-9 h-9 hidden md:block flex-none "
      />
      <div>
        <div className="flex-none font-normal text-sm flex gap-1 items-center flex-row  flex-wrap">
          <span className="font-bold whitespace-nowrap ">{profile.name}</span>
          <span className="text-text-500 text-xs">({profile.email})</span>
          <span className="text-text-500 text-xs">
            {createtime.substr(0, 10)} {createtime.substr(11, 8)}
          </span>
        </div>
        <div className="text-sm border-t mt-2 pt-3 sm:border-0 sm:mt-1 sm:pt-0 border-text-200">
          {content}
        </div>
      </div>
      <div className="ml-auto">
        {user && user.pk === writerpk && (
          <CommentRemoveButton
            onRemove={() => {
              dispatch(deleteComment(commentpk, activityid, chapterid));
            }}
          />
        )}
      </div>
    </div>
  );
};

export const CommentList = ({ comments }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  return (
    <div className="min-h-chapterList">
      <h3 className="m-1">댓글</h3>
      <div className="flex gap-1 flex-col">
        <CommentInput dispatch={dispatch} />
        {isArray(comments) ? (
          comments
            .sort(function (a, b) {
              if (a.commentpk > b.commentpk) {
                return -1;
              } else if (a.commentpk < b.commentpk) {
                return 1;
              } else {
                return 0;
              }
            })
            .map((comment, index) => {
              return (
                <span key={comment.commentpk}>
                  <CommentListItem
                    comment={comment}
                    index={index}
                    dispatch={dispatch}
                    user={user}
                  />
                </span>
              );
            })
        ) : (
          <div className="text-text-400 text-sm mt-3">댓글이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default CommentList;
