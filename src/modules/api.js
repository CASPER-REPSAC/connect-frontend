import axios from 'axios';
import { Cookies } from 'react-cookie';

export const WEB_SERVER_URL = `${process.env.REACT_APP_FRONT_SERVER_BASE_URL}`;
export const API_SERVER_URL = `${process.env.REACT_APP_BACK_SERVER_BASE_URL}`;

const baseURL = API_SERVER_URL;

const cookies = new Cookies();

// ActivityDetailPage
async function getActivityDetail(activity_id, setState) {
  const res = await axios.get(`/api/activities/${activity_id}/`);
  console.log('getActivityDetail', res);
  if (res.status === 200) {
    console.log('getActivityDetail res', res);
    setState(res.data[0]);
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
  const token = 'Bearer ' + cookies.get('access_token');
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

// id 사용하지 않고
// groups, actiparticipants, category, activities
function getDataByURL(url) {
  return axios.get(url);
}

async function uploadChapterFiles(targetFiles, activityId, chapterId) {
  const token = 'Bearer ' + cookies.get('access_token');
  let count = 0;
  const arr = [];
  console.log('targetFiles', targetFiles);
  if (targetFiles.length > 0) {
    for (let i = 0; i < targetFiles.length; i++) {
      let formData = new FormData();
      formData.append('file', targetFiles[i]);
      const fileName = targetFiles[i].name;
      console.log(
        `/api/activities/${activityId}/chapter/${chapterId}/upload/${fileName}/`,
      );
      await axios
        .post(
          `/api/activities/${activityId}/chapter/${chapterId}/upload/${fileName}/`,
          formData,
          {
            headers: {
              authorization: token,
            },
          },
        )
        .then((res) => {
          console.log(res);
          count++;
        })
        .catch((err) => {
          console.log(err);
          arr.push(fileName);
        });
    }
  }
  return [count, arr];
}

// api/activities/<int:pk>/chapter/<int:chapterid>/upload/<str:filename>
async function uploadChapterFile(activityId, chapterId, fileName, formData) {
  const token = 'Bearer ' + cookies.get('access_token');
  await axios
    .post(
      `/api/activities/${activityId}/chapter/${chapterId}/upload/${fileName}/`,
      formData,
      {
        headers: {
          authorization: token,
        },
      },
    )
    .then((res) => {
      console.log(res);
      return 1;
    })
    .catch((err) => {
      console.log(err);
      return -1;
    });
}

async function submitChapter(data, activityId, setWriteRes) {
  console.log('submitChapter');
  const token = 'Bearer ' + cookies.get('access_token');
  const datas = {
    ...data,
    token: token,
  };
  const res = await axios.post(`/api/activities/${activityId}`, datas, {
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
  });

  if (res['status'] === 201) {
    setWriteRes(true);
    console.log(res);
    return res['data']['chapterid'];
  } else {
    setWriteRes(false);
  }
}

const submitActivity = async (data, setWriteRes, setResID) => {
  const token = 'Bearer ' + cookies.get('access_token');
  const datas = {
    ...data,
    token: token,
  };

  await axios
    .post('/api/activities/', datas, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
    .then((response) => {
      console.log(response);
      if (response['status'] === 201) {
        setWriteRes(true);
        setResID(response['data']['id']);
      }
    })
    .catch((error) => {
      console.log('err', error);
    });
};

export {
  getActivityDetail,
  getTags,
  getTagInfo,
  getUsers,
  getListData,
  getDataByURL,
  getCardsByTag,
  submitChapter,
  submitActivity,
  uploadChapterFile,
  uploadChapterFiles,
};
