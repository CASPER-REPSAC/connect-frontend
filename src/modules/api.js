import axios from 'axios';

export const WEB_SERVER_URL = `${process.env.REACT_APP_FRONT_SERVER_BASE_URL}`;
export const API_SERVER_URL = `${process.env.REACT_APP_BACK_SERVER_BASE_URL}`;

const baseURL = API_SERVER_URL;

// dsd
async function getActivityDetail(activity_id, setState) {
  const res = await axios.get('/api/activities/' + activity_id + '/');
  console.log('getActivityDetail', res);
  if (res.data) {
    setState(res.data[0]);
  }
}

async function getTags(setTags, tags) {
  const res = await axios.get('/api/tags/');
  setTags(res.data.result);
}

async function getTagInfo(tag_id, setTagInfo) {
  const res = await axios.get('/api/tags/' + tag_id + '/');
  setTagInfo(res.data);
}

function getUsers(user_id) {
  return axios.get(baseURL + '/users/' + user_id + '/');
}

async function getListData(url, setState) {
  const res = await axios.get(url);
  const data = res.data;
  console.log('getListData', data, typeof data);

  setState(
    res.data.sort(function (a, b) {
      if (new Date(a.createDate) > new Date(b.createDate)) {
        return -1;
      } else if (new Date(a.createDate) < new Date(b.createDate)) {
        return 1;
      } else {
        return 0;
      }
    }),
  );
}

// id 사용하지 않고
// groups, actiparticipants, category, activities
function getDataByURL(url) {
  return axios.get(url);
}

export {
  getActivityDetail,
  getTags,
  getTagInfo,
  getUsers,
  getListData,
  getDataByURL,
};
