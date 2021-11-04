import React, { useState, useEffect } from 'react';

import ActivityDetail from '../components/detail/ActivityDetail';
import { getActivityDetail } from '../modules/api';

const ActivityDetailPage = ({ match }) => {
  const [activityDetail, setActivityDetail] = useState();
  useEffect(() => {
    getActivityDetail(match.params.activityId, setActivityDetail);
  }, [match.params.activityId]);

  return (
    <>{activityDetail && <ActivityDetail activityDetail={activityDetail} />}</>
  );
};

export default React.memo(ActivityDetailPage);
