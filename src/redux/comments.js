import { commentsAPI } from "@/api";
import { getChapter } from "./chapters";

import { removeCommentInput } from "./inputs";
import { startLoading, requestSuccess, requestFail } from "./loadings";

const CREATE_COMMENT = "comments/CREATE_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";

export const createComment =
  (activity_id, chapter_id) => async (dispatch, getState) => {
    dispatch(startLoading(CREATE_COMMENT));
    try {
      const writer = getState().auth.user.pk;
      const comment = getState().inputs.commentInput[chapter_id];
      await commentsAPI.create_comment({
        writer,
        comment,
        chapter_id,
        activity_id,
      });
      dispatch(removeCommentInput(chapter_id));
      dispatch(requestSuccess(CREATE_COMMENT));
      dispatch(getChapter(activity_id, chapter_id));
    } catch (error) {
      dispatch(requestFail(CREATE_COMMENT, error));
    }
  };

export const deleteComment =
  (commentpk, activity_id, chapter_id) => async (dispatch) => {
    dispatch(startLoading(DELETE_COMMENT));
    try {
      await commentsAPI.delete_comment(commentpk);
      dispatch(requestSuccess(DELETE_COMMENT));
      dispatch(getChapter(activity_id, chapter_id));
    } catch (error) {
      dispatch(requestFail(DELETE_COMMENT, error));
    }
  };
