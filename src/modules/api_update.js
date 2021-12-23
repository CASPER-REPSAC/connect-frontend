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
    `/api/activities/${activityId}/chapter/${chapterId}/update_chapter/`,
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
    return res['data']['chapterid'];
  } else {
    setWriteRes(false);
  }
}

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
    .patch(`/api/activities/${activityId}/`, datas, {
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

export { updateChapter, updateActivity };
