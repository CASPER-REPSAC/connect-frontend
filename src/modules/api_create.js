import axios from 'axios';
import { Cookies } from 'react-cookie';

export const WEB_SERVER_URL = `${process.env.REACT_APP_FRONT_SERVER_BASE_URL}`;
export const API_SERVER_URL = `${process.env.REACT_APP_BACK_SERVER_BASE_URL}`;

const cookies = new Cookies();

const isAccessToken = () => {
  const accessToken = cookies.get('access_token');
  if (!accessToken) {
    return false;
  } else {
    return accessToken;
  }
};

// url, data => res
const sendPostRequest = async (url, data) => {
  const accessToken = isAccessToken();
  if (!accessToken) {
    return false;
  }
  const token = 'Bearer ' + accessToken;
  data = {
    ...data,
    token: token,
  };
  const res = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
  });
  return res;
};

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
  const res = await sendPostRequest(`/api/activities/${activityId}/`, data);

  if (res['status'] === 201) {
    setWriteRes(true);
    console.log(res);
    return res['data']['chapterid'];
  } else {
    setWriteRes(false);
  }
}

const submitActivity = async (data, setWriteRes, setResID) => {
  const res = await sendPostRequest('/api/activities/', data);

  if (res['status'] === 201) {
    setWriteRes(true);
    setResID(res['data']['id']);
  } else {
    setWriteRes(false);
  }
};

const submitComment = async (data) => {
  data = { ...data, createtime: '2021-12-23 05:11:04' };
  const res = await sendPostRequest(`/api/activities/write_comment/`, data);
  // data = {comment, activityid, chapterid, createtime, writer(accessToken)};
  console.log(res);
};

const submitActiParticipants = async (activity_id, user_id) => {
  const data = {
    activity_id: activity_id,
    user_id: user_id,
  };
  const res = await sendPostRequest(`/api/w00/actiparticipants/ `, data);

  // data = {comment, activityid, chapterid, createtime, writer(accessToken)};
  console.log(res);
};

export {
  submitChapter,
  submitActivity,
  uploadChapterFile,
  uploadChapterFiles,
  submitComment,
  submitActiParticipants,
};
