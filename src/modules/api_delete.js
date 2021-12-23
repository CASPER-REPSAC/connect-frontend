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

async function deleteChapter(activityId, setDeleteRes, chapterId) {
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

  console.log('delete chapter res', res);
  if (res['status'] === 201 || res['status'] === 200 || res['status'] === 204) {
    setDeleteRes(true);
  } else {
    setDeleteRes(false);
  }
}

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

const deleteComment = async (commentpk) => {
  const accessToken = isAccessToken();
  if (!accessToken) {
    return false;
  }
  const token = 'Bearer ' + accessToken;
  const data = { authorization: token };

  const res = await axios.post(
    `/api/activities/delete_comment/${commentpk}/`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    },
  );
  console.log(res);
};

export { deleteChapter, deleteActivity, deleteComment };
