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

  const res = await axios.delete(
    `/api/activities/${activityId}/chapter/${chapterId}/`,
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
  console.log('deleteActivity');
  const accessToken = isAccessToken();
  if (!accessToken) {
    return false;
  }
  const token = 'Bearer ' + accessToken;

  const res = await axios.delete(`/api/w00/activities/${activityId}/`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
  });

  if (res.status === 204 || res.status === 200 || res.status === 201) {
    setWriteRes(true);
  } else {
    setWriteRes(false);
  }
};

const deleteComment = async (commentpk, setState) => {
  const accessToken = isAccessToken();
  if (!accessToken) {
    return false;
  }
  const token = 'Bearer ' + accessToken;
  const data = { authorization: token };
  console.log('deleteComment');
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
  if (res.status === 204 || res.status === 201 || res.status === 200) {
    setState(true);
  } else setState(false);
  // console.log(res);
};

const deleteActiParticipants = async (activity_id, user_id, setWriteRes) => {
  const accessToken = isAccessToken();
  if (!accessToken) {
    return false;
  }
  const token = 'Bearer ' + accessToken;
  const data = {
    activity_id: activity_id,
    user_id: user_id,
  };
  await axios
    .post(`/api/activities/${activity_id}/out/`, data, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
    .then((response) => {
      setWriteRes(true);
    })
    .catch((error) => {
      setWriteRes(false);
      console.log('err', error);
    });
};

export { deleteChapter, deleteActivity, deleteComment, deleteActiParticipants };
