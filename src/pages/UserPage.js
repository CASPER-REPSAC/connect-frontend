import React, { useState, useEffect } from 'react';
import { getUserActivityList } from 'modules/api';
import { NoCards } from 'components/common/NoCards';

const UserPage = ({ match }) => {
  const [userActiCards, setUserActiCards] = useState();

  useEffect(() => {
    if (match.userId) {
      getUserActivityList(match.userId, setUserActiCards);
    }
  }, [match]);
  return <NoCards msg="아직 유저 검색기능이 없습니다." />;
};

export default UserPage;
