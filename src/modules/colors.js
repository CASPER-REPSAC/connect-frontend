import { handleActions } from 'redux-actions';

// action types

// action genarator functions

// id, type, title, author, createdDate, content, currentState, startDate, endDate
// initial state

// author과 participants는 문자열보다 사용자 id를 사용하는게 나을 듯 함.
const initialState = {
  palette: {
    gray: [
      '#f8f9fa',
      '#f1f3f5',
      '#e9ecef',
      '#dee2e6',
      '#ced4da',
      '#adb5bd',
      '#868e96',
      '#495057',
      '#343a40',
      '#212529',
    ],
    cyan: [
      '#e3fafc',
      '#c5f6fa',
      '#99e9f2',
      '#66d9e8',
      '#3bc9db',
      '#22b8cf',
      '#15aabf',
      '#1098ad',
      '#0c8599',
      '#0b7285',
    ],
  },
  tagColors: {
    pwn: 'midnightblue',
    web: 'darkcyan',
    rev: 'OrangeRed',
  },
  currentColors: {
    text: '#27242C',
    bbackGround: '#ebe9ef',
    unActiveCard: '#f4f4f4',
    stroke: '#E0E0E0',
    background: '#FFFFFF',
    shadow: 'rgba(0,0,0,0.05)',
    unActiveButton: '#F3F3F3',
    unActiveButtonText: '#AFAFB4',
  },
};

// reducers
const colors = handleActions({}, initialState);

// export
export default colors;
