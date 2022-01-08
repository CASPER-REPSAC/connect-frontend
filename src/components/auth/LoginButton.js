import React from 'react';
import axios from 'axios';
import Button from '../common/Button';

const onClickHandler = async () => {
  await axios
    .get('/accounts/google/login/')
    .then((res) => {})
    .catch((e) => {});
};
const LoginButton = () => {
  return (
    <Button
      className="d-block"
      width="100%"
      onClick={() => {
        onClickHandler();
      }}
    >
      로그인
    </Button>
  );
};

export default LoginButton;
