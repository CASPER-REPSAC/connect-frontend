import axios from 'axios';
import { Cookies } from 'react-cookie';

export const WEB_SERVER_URL = `${process.env.REACT_APP_FRONT_SERVER_BASE_URL}`;
export const API_SERVER_URL = `${process.env.REACT_APP_BACK_SERVER_BASE_URL}`;

const baseURL = API_SERVER_URL;

const cookies = new Cookies();

const isAccessToken = () => {
  const accessToken = cookies.get('access_token');
  if (!accessToken) {
    return false;
  } else {
    return accessToken;
  }
};

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

// id 사용하지 않고
// groups, actiparticipants, category, activities
function getDataByURL(url) {
  return axios.get(url);
}

async function uploadChapterFiles(targetFiles, activityId, chapterId) {
  const accessToken = isAccessToken();
  if (!accessToken) {
    return false;
  }
  const token = 'Bearer ' + accessToken;

  let fileCount = 0;
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
          fileCount++;
        })
        .catch((err) => {
          console.log(err);
          arr.push(fileName);
        });
    }
  }
  return [fileCount, arr];
}

// api/activities/<int:pk>/chapter/<int:chapterid>/upload/<str:filename>
async function uploadChapterFile(activityId, chapterId, fileName, formData) {
  const accessToken = isAccessToken();
  if (!accessToken) {
    return false;
  }
  const token = 'Bearer ' + accessToken;
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
  const accessToken = isAccessToken();
  if (!accessToken) {
    return false;
  }
  const token = 'Bearer ' + accessToken;
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

// api/activities/int:pk/chapter/int:chapterid/update_chapter/
async function updateChapter(data, activityId, setWriteRes, chapterId) {
  const accessToken = isAccessToken();
  if (!accessToken) {
    return false;
  }
  const token = 'Bearer ' + accessToken;
  const datas = {
    ...data,
    token: token,
  };
  const res = await axios.post(
    `/api/activities/${activityId}/chapter/${chapterId}/update_chapter`,
    datas,
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    },
  );

  if (res['status'] === 201) {
    setWriteRes(true);
    console.log(res);
    return res['data']['chapterid'];
  } else {
    setWriteRes(false);
  }
}

async function deleteChapter(activityId, setWriteRes, chapterId) {
  const accessToken = isAccessToken();
  if (!accessToken) {
    return false;
  }
  const token = 'Bearer ' + accessToken;
  const datas = {
    token: token,
  };
  const res = await axios.delete(
    `/api/activities/${activityId}/chapter/${chapterId}/`,
    datas,
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    },
  );

  if (res['status'] === 201 || res['status'] === 200) {
    setWriteRes(true);
    console.log(res);
  } else {
    setWriteRes(false);
  }
}

const submitActivity = async (data, setWriteRes, setResID) => {
  const accessToken = isAccessToken();
  if (!accessToken) {
    return false;
  }
  const token = 'Bearer ' + accessToken;
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

// /api/w00/activities/<액티비티id>/
const updateActivity = async (data, setWriteRes, setResID, activityId) => {
  console.log('updateactivity', activityId);
  const accessToken = isAccessToken();
  if (!accessToken) {
    return false;
  }
  const token = 'Bearer ' + accessToken;
  const datas = {
    ...data,
    token: token,
  };

  await axios
    .put(`/api/w00/activities/${activityId}/`, datas, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
    .then((response) => {
      console.log(response);
      setWriteRes(true);
      setResID(response['data']['id']);
    })
    .catch((error) => {
      console.log('err', error);
    });
};

// /api/w00/activities/<액티비티id>/
const deleteActivity = async (setWriteRes, activityId) => {
  const accessToken = isAccessToken();
  if (!accessToken) {
    return false;
  }
  const token = 'Bearer ' + accessToken;
  const datas = {
    token: token,
  };

  await axios
    .delete(`/api/w00/activities/${activityId}/`, datas, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
    .then((response) => {
      setWriteRes(true);
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
  updateChapter,
  deleteChapter,
  submitActivity,
  updateActivity,
  deleteActivity,
  uploadChapterFile,
  uploadChapterFiles,
};
