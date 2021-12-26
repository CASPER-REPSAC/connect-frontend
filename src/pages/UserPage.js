import React, { useState, useEffect } from 'react';
import { getUserActivityList } from 'modules/api';
import { NoCards } from 'components/common/NoCards';

const UserPage = ({ match }) => {
  console.log(match);

  const [userActiCards, setUserActiCards] = useState();
  console.log(userActiCards);

  useEffect(() => {
    if (match.userId) {
      getUserActivityList(match.userId, setUserActiCards);
    }
  }, [match]);
  return <NoCards msg="아직 유저 검색기능이 없습니다." />;
};

export default UserPage;
