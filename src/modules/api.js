import {
  submitChapter,
  submitActivity,
  uploadChapterFile,
  uploadChapterFiles,
  submitComment,
  submitActiParticipants,
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
  getUserActivityList,
} from './api_read';
import { updateChapter, updateActivity } from './api_update';
import { deleteChapter, deleteActivity, deleteComment } from './api_delete';

export const WEB_SERVER_URL = `${process.env.REACT_APP_FRONT_SERVER_BASE_URL}`;
export const API_SERVER_URL = `${process.env.REACT_APP_BACK_SERVER_BASE_URL}`;

export {
  submitChapter,
  submitActivity,
  submitComment,
  uploadChapterFile,
  uploadChapterFiles,
  submitActiParticipants,
  getActivityDetail,
  getTags,
  getTagInfo,
  getUsers,
  getListData,
  getActivityList,
  getDataByURL,
  getCardsByTag,
  getSearchResult,
  getUserActivityList,
  updateChapter,
  updateActivity,
  deleteChapter,
  deleteActivity,
  deleteComment,
};
