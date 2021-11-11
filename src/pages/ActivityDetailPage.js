import React, { useState, useEffect } from 'react';

import ActivityDetail from '../components/detail/ActivityDetail';
import { getActivityDetail } from '../modules/api';
import axios from 'axios';

const ActivityDetailPage = ({ match, history }) => {
  const { params } = match;

  const [activityDetail, setActivityDetail] = useState();
  useEffect(() => {
    getActivityDetail(params.activityId, setActivityDetail);
  }, [params]);
  const [writeRes, setWriteRes] = useState(false);
  const [resID, setResID] = useState();

  async function CChapterTest() {
    const data = {
      activityid: params.activityId,
      subject: 'test chap',
      article: 'test art',
    };
    console.log('CChapterTest data', data);
    await axios
      .post(`/api/activities/${params.activityId}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        if (response['status'] === 201) {
          setWriteRes(true);
          setResID(response['data']['chapterid']);
        }
        history.go(0);
      })
      .catch((error) => {
        console.log('err', error);
      });
  }
  return (
    <>
      {console.log(match)}
      {activityDetail && <ActivityDetail activityDetail={activityDetail} />}
      <button onClick={() => CChapterTest()}>챕터 생성 테스트</button>
    </>
  );
};

export default React.memo(ActivityDetailPage);
