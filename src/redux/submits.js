import * as commentsAPI from "@/api/comments";
import { getChapter } from "./chapters";
import { removeCommentInput } from "./inputs";

const SUBMIT_COMMENT = "comments/SUBMIT_COMMENT";
const SUBMIT_COMMENT_SUCCESS = "comments/SUBMIT_COMMENT_SUCCESS";
const SUBMIT_COMMENT_FAIL = "comments/SUBMIT_COMMENT_FAIL";

//   comment,
//   activityid,
//   chapterid,
//   writer
export const submitComment =
  (activity_id, chapter_id) => async (dispatch, getState) => {
    const [success, fail] = [
      `${SUBMIT_COMMENT}_SUCCESS`,
      `${SUBMIT_COMMENT}_FAIL`,
    ];
    const writer = getState().auth.user.pk;
    const token = getState().auth.accessToken;
    const comment = getState().inputs.commentInput[chapter_id];

    dispatch({ type: SUBMIT_COMMENT });
    try {
      await commentsAPI.submit_comment({
        writer,
        comment,
        chapter_id,
        activity_id,
        token,
      });
      dispatch({ type: success });
      dispatch(removeCommentInput(chapter_id));
      dispatch(getChapter(activity_id, chapter_id));
    } catch (error) {
      dispatch({ type: fail, error });
    }
  };

const initialState = {
  comment: {
    loading: false,
    error: null,
  },
};

export const submits = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_COMMENT:
      return {
        ...state,
        comment: {
          ...state.comment,
          error: null,
          loading: true,
        },
      };
    case SUBMIT_COMMENT_SUCCESS:
      return {
        ...state,
        comment: {
          ...state.comment,
          loading: false,
        },
      };

    case SUBMIT_COMMENT_FAIL:
      return {
        ...state,
        comment: { ...state.comment, loading: false, error: action.error },
      };
    default:
      return state;
  }
};

export default submits;
