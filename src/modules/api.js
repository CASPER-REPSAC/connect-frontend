import axios from 'axios';

export const WEB_SERVER_URL = `${process.env.REACT_APP_FRONT_SERVER_BASE_URL}`;
export const API_SERVER_URL = `${process.env.REACT_APP_BACK_SERVER_BASE_URL}`;

const baseURL = API_SERVER_URL;

function getActivity(activity_id) {
  return axios.get(baseURL + '/activities/' + activity_id + '/');
}

function getTag(tag_id) {
  return axios.get(baseURL + '/tags/' + tag_id + '/');
}

function getUsers(user_id) {
  return axios.get(baseURL + '/users/' + user_id + '/');
}

function getListData(url) {
  return axios.get(baseURL + url);
}

// id 사용하지 않고
// groups, actiparticipants, category, activities
function getDataByURL(url) {
  return axios.get(url);
}

export { getActivity, getTag, getUsers, getListData, getDataByURL };
