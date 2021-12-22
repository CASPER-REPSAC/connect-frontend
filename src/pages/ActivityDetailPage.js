import React, { useState, useEffect } from 'react';

import ActivityDetail from '../components/detail/ActivityDetail';
import { getActivityDetail } from '../modules/api';
import axios from 'axios';

import WriteChapter from '../components/write/WriteChapter';
import Button from '../components/common/Button';

const ActivityDetailPage = ({ match, history }) => {
  const { params } = match;

  const [activityDetail, setActivityDetail] = useState();
  useEffect(() => {
    getActivityDetail(params.activityId, setActivityDetail);
  }, [params]);

  return (
    <>
      <div className="d-flex flex-column justify-content-between h-100">
        {console.log(match)}
        {activityDetail && <ActivityDetail activityDetail={activityDetail} />}
        <div className="d-flex justify-content-between">
          <Button
            width="content-fit"
            style={{ marginLeft: '5px' }}
            onClick={() => {
              history.push(`/write/activities/${params.activityId}`);
            }}
          >
            챕터 작성
          </Button>
          <Button
            width="content-fit"
            onClick={() => {
              history.push(`/write/activities/${params.activityId}/update`);
            }}
          >
            액티비티 수정
          </Button>
        </div>
      </div>
    </>
  );
};

export default React.memo(ActivityDetailPage);
