import axios from 'axios';

export const WEB_SERVER_URL = `${process.env.REACT_APP_FRONT_SERVER_BASE_URL}`;
export const API_SERVER_URL = `${process.env.REACT_APP_BACK_SERVER_BASE_URL}`;

const baseURL = API_SERVER_URL;

// ActivityDetailPage
async function getActivityDetail(activity_id, setState) {
  const res = await axios.get(`/api/activities/${activity_id}/`);
  console.log('getActivityDetail', res);
  if (res.status === 200 && res.data.length > 0) {
    console.log('getActivityDetail res', res);
    setState(res.data[0]);
    return true;
  } else {
    return false;
  }
}

async function getTags(tags, setTags) {
  const res = await axios.get('/api/w00/tags/');
  if (res.status === 201) {
    return res.stutus;
  }
}

// TagPage
async function getTagInfo(tag_id, setTagInfo) {
  const res = await axios.get('/api/w00/tags/' + tag_id + '/');
  setTagInfo(res.data);
}

// TagPage
async function getCardsByTag(tagId, setState) {
  async function getActivity(activityId) {
    const res = await axios.get(`/api/activities/${activityId}/`);
    return res.data[0];
  }
  const res = await axios.get(`/api/w00/tags/${tagId}/`);
  if (res.status === 200) {
    console.log('getCardsByTag - res', res);
    const cards = await Promise.all(
      res.data.acti.map((acti) => {
        return getActivity(acti.activity_id);
      }),
    );
    setState(cards);
  }
}

function getUsers(user_id) {
  return axios.get(baseURL + '/users/' + user_id + '/');
}

// lots...
async function getListData(url, setState) {
  const res = await axios.get(url);
  const data = res.data;
  console.log('getListData', data, typeof data);

  setState(
    data.sort(function (a, b) {
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

async function getActivityList(setState) {
  const res = await axios.get('/api/activities/');
  const data = res.data;
  console.log('getListData', data, typeof data);

  setState(
    data.sort(function (a, b) {
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

const getSearchResult = async (keyword, search_type, setState, page_number) => {
  const data = {
    keyword: keyword,
    search_type: search_type,
    page_number: page_number,
  };
  const res = await axios.get(`/api/search/`, {
    params: data,
  });
  if (res.status === 200) {
    setState(res.data);
  }
  console.log(res);
};

const getUserActivityList = async (userId, setState) => {
  const res = await axios.get(`/api/w00/users/${userId}/`);
  if (res.status === 200 || res.status === 201 || res.status === 204) {
    setState(res.data);
  }
  console.log(res);
};

export {
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
};
