import React, { useState, useEffect } from 'react';
import { getActivityDetail } from '../modules/api';
import { useSelector } from 'react-redux';
import ManageActivity from '../components/manage/ManageActivity';
import { NoCards } from '../components/common/NoCards';
import '../styles/Write.scss';

const ActivityManagePage = ({ match, history }) => {
  const { params } = match;
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const [activityDetail, setActivityDetail] = useState();
  const [tags, setTags] = useState();
  const [prevParticipants, setPrevParticipants] = useState();

  useEffect(() => {
    if (!user.email) {
      history.go(-1);
    }
  }, []);

  useEffect(() => {
    if (activityDetail && activityDetail.author !== user.email) {
      history.go(-1);
    }
    if (activityDetail) {
      setTags([...activityDetail.tags.map((tag) => tag.tag_name)]);
      setPrevParticipants([...activityDetail.participants]);
    }
  }, [activityDetail]);

  useEffect(() => {
    getActivityDetail(params.activityId, setActivityDetail);
  }, []);

  return (
    <>
      {activityDetail && tags && Array.isArray(tags) ? (
        <ManageActivity
          match={match}
          history={history}
          activityDetail={activityDetail}
          prevTags={tags}
          prevParticipants={prevParticipants}
        />
      ) : (
        <NoCards msg="액티비티 정보를 불러올 수 없습니다." />
      )}
    </>
  );
};

export default ActivityManagePage;
