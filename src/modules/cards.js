import { handleActions } from 'redux-actions';

// action types

// action genarator functions

// id, type, title, author, createdDate, content, currentState, startDate, endDate
// initial state

// author과 participants는 문자열보다 사용자 id를 사용하는게 나을 듯 함.
const initialState = {
  cards: [
    {
      id: 1,
      title: 'Connect Develope e fefe fef',
      type: 'project',
      author: '5 11',
      participants: ['floodnut', 'woo'],
      createDate: '2021-07-01',
      content:
        'working on... and on and on and on and on and on and dddddd dddddd ddddd ddddd ddddd dddddddd dddd ddddddd ddddd',
      currentState: 'running',
      startDate: '2021-07-05',
      endDate: '2021-07-27',
      read: false,
      tags: ['pwn', 'web'],
      viewer_num: 100,
    },
    {
      id: 2,
      title: 'this is title',
      type: 'CTF',
      author: '5 11',
      participants: ['pawnTTi', 'swimming', 'dongas', '박지성분', 'neva'],
      createDate: '2021-07-02',
      content: 'this is content. 몇 자 이상은 ... 더보기 처리...',
      currentState: 'finished',
      startDate: '2021-07-06',
      endDate: '2021-07-15',
      read: true,
      tags: ['rev', 'pwn'],
      viewer_num: 180,
    },
  ],
};

// reducers
const cards = handleActions({}, initialState);

// export
export default cards;
