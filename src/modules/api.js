import axios from 'axios';

export const WEB_SERVER_URL = `${process.env.REACT_APP_FRONT_SERVER_BASE_URL}`;
export const API_SERVER_URL = `${process.env.REACT_APP_BACK_SERVER_BASE_URL}`;

const baseURL = API_SERVER_URL;

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
  const res = await axios.get('/api/tags/');
  if (res.status === 201) {
    return res.stutus;
  }
}

// TagPage
async function getTagInfo(tag_id, setTagInfo) {
  const res = await axios.get('/api/tags/' + tag_id + '/');
  setTagInfo(res.data);
}

// TagPage
async function getCardsByTag(tagId, setState) {
  async function getActivity(activityId) {
    const res = await axios.get(`/api/activities/${activityId}`);
    return res.data[0];
  }
  const res = await axios.get(`/api/tags/${tagId}`);
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

// api/activities/<int:pk>/chapter/<int:chapterid>/upload/<str:filename>
async function uploadChapterFile(activityId, chapterId, filePath, fileBlob) {
  let reader = new FileReader();
  reader.readAsDataURL(fileBlob);

  const formData = new FormData();
  formData.append('files', fileBlob, fileBlob.name);
  formData.append('enctype', 'multipart/form-data');
  console.log(
    'req address',
    `/api/activities/${activityId}/chapter/${49}/upload/${fileBlob.name}`,
  );
  const res = await axios.post(
    `/api/activities/${activityId}/chapter/${49}/upload/${fileBlob.name}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  if (res.status === 201) {
    console.log(res);
  }
}

async function submitChapter(chapterInput, filePath, fileBlob) {
  console.log('chapterInput', chapterInput);
  console.log('filePath', filePath);
  console.log('fileBlob', fileBlob);
  console.log('fileBlob.name', fileBlob.name);
  const res = await axios.post(
    `/api/activities/${chapterInput.activityid}`,
    chapterInput,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  console.log('submitChpate', res);

  if (res.status === 201 && filePath) {
    console.log(res);
    uploadChapterFile(
      res.data.activityid,
      res.data.chapterid,
      filePath,
      fileBlob,
    );
  }
}

export {
  getActivityDetail,
  getTags,
  getTagInfo,
  getUsers,
  getListData,
  getDataByURL,
  getCardsByTag,
  submitChapter,
  uploadChapterFile,
};
