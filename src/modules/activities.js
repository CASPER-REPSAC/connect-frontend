import { handleActions } from 'redux-actions';
import {
  getActivity,
  getTag,
  getUsers,
  getListData,
  getDataByURL,
} from './api';

// action types
const SET_ACTIVITIES = 'activities/GET_ACTIVITIES';

// action genarator functions
export const getActivites = () => (dispatch) => {
  return getListData('/activities/')
    .then((response) => {
      console.log(response);
      dispatch({
        type: SET_ACTIVITIES,
        payload: response['results'],
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// id, type, title, author, createdDate, content, currentState, startDate, endDate
// initial state

// author과 participants는 문자열보다 사용자 id를 사용하는게 나을 듯 함.
const initialState = {
  activities: [
    {
      id: 1,
      title: 'Connect Develope e fefe fef',
      type: 'project',
      author: '5 11',
      participants: ['floodnut', 'woo'],
      createDate: '2021-07-01',
      introduce: '여기는 첫째줄에서 잘림. 간단한 소개 파트가 필요해보임',
      currentState: 0,
      startDate: '2021-07-05',
      endDate: '2021-07-27',
      tags: ['pwn', 'web'],
      viewerNum: 100,
    },
    {
      id: 2,
      title: 'this is title',
      type: 'CTF',
      author: '5 11',
      participants: ['pawnTTi', 'swimming', 'dongas', '박지성분', 'neva'],
      createDate: '2021-07-02',
      introduce:
        '그래서 컴팩트 있는 소개를 따로 입력받았으면 합니다. 나중에 추가해도 됨 가나다라 마 바사 아자 차가 타 파하..',
      currentState: 0,
      startDate: '2021-07-06',
      endDate: '2021-07-15',
      tags: ['rev', 'pwn'],
      viewer_num: 180,
    },
    {
      id: 3,
      title: 'this is title',
      type: 'CTF',
      author: '5 11',
      participants: [
        'pawnTTi',
        'swimming',
        'dongas',
        '박지성분',
        'neva',
        'root',
        '신성민',
      ],
      createDate: '2021-07-02',
      introduce:
        'i like jelly fish i like jelly fish i like sponge bob living in the pineapple ',
      currentState: 0,
      startDate: '2021-07-06',
      endDate: '2021-07-15',
      tags: ['rev', 'pwn'],
      viewer_num: 180,
    },
    {
      id: 4,
      title: 'this is title',
      type: 'CTF',
      author: '5 11',
      participants: [
        'pawnTTi',
        'swimming',
        'dongas',
        '박지성분',
        'neva',
        'root',
        '신성민',
      ],
      createDate: '2021-07-02',
      introduce:
        'i like jelly fish i like jelly fish i like sponge bob living in the pineapple ',
      currentState: 0,
      startDate: '2021-07-06',
      endDate: '2021-07-15',
      tags: ['rev', 'pwn'],
      viewer_num: 180,
    },
  ],
};

// reducers
const activities = handleActions(
  {
    [SET_ACTIVITIES]: (state, action) => ({
      ...state,
      activities: action.payload,
    }),
  },
  initialState,
);

// export
export default activities;