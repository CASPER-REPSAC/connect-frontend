import React, { useState, useEffect } from 'react';

import ActivityDetail from '../components/detail/ActivityDetail';
import { getActivityDetail } from '../modules/api';
import axios from 'axios';

import WriteChapter from '../components/write/WriteChapter';
import Button from "../components/common/Button";


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
    <div className="d-flex flex-column justify-content-between h-100">
      {console.log(match)}
      {activityDetail && <ActivityDetail activityDetail={activityDetail} />}
      {/* <button onClick={() => CChapterTest()}>챕터 생성 테스트</button> */}
      <div style={{textAlign:"right"}}>
        <Button width="100px" onClick={()=>{history.push(`/write/activities/${params.activityId}`)}}>챕터 작성</Button>
      </div>
    </div>
    </>
  );
};

export default React.memo(ActivityDetailPage);
