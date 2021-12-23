import {
  submitChapter,
  submitActivity,
  uploadChapterFile,
  uploadChapterFiles,
  submitComment,
} from './api_create';
import {
  getActivityDetail,
  getTags,
  getTagInfo,
  getUsers,
  getListData,
  getActivityList,
  getDataByURL,
  getCardsByTag,
  getSearchResult,
} from './api_read';
import { updateChapter, updateActivity } from './api_update';
import { deleteChapter, deleteActivity, deleteComment } from './api_delete';

export const WEB_SERVER_URL = `${process.env.REACT_APP_FRONT_SERVER_BASE_URL}`;
export const API_SERVER_URL = `${process.env.REACT_APP_BACK_SERVER_BASE_URL}`;

export {
  getActivityDetail,
  getTags,
  getTagInfo,
  getUsers,
  getListData,
  getActivityList,
  getDataByURL,
  getCardsByTag,
  submitChapter,
  updateChapter,
  deleteChapter,
  submitActivity,
  updateActivity,
  deleteActivity,
  uploadChapterFile,
  uploadChapterFiles,
  submitComment,
  deleteComment,
  getSearchResult,
};
