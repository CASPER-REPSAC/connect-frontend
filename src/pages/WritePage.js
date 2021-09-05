import React from 'react';
import axios from 'axios';
import WriteActivity from '../components/write/WriteActivity';
import '../styles/Write.scss';

const WritePage = () => {
  return (
    <div>
      <WriteActivity></WriteActivity>
    </div>
  );
};

export default React.memo(WritePage);
