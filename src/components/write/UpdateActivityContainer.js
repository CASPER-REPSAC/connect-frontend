import React, { useState, useEffect } from 'react';
import { getActivityDetail } from '../../modules/api';
import UpdateActivity from './UpdateActivity';

const UpdateActivityContainer = ({ match }) => {
  const [activityDetail, setActivityDetail] = useState();
  useEffect(() => {
    if (match.params.activityId) {
      getActivityDetail(match.params.activityId, setActivityDetail);
    }
  }, [match]);

  // states for write form
  const [tags, setTags] = useState();

  useEffect(() => {
    if (activityDetail) {
      setTags([...activityDetail.tags.map((tag) => tag.tag_name)]);
    }
  }, [activityDetail]);

  return (
    <div>
      {/* {console.log(tags)} */}
      {activityDetail && tags ? (
        <>
          <UpdateActivity
            match={match}
            activityDetail={activityDetail}
            prevTags={tags}
          />
        </>
      ) : (
        <>
          <small className="text-muted">액티비티 불러오는 중..</small>
        </>
      )}
    </div>
  );
};

export default UpdateActivityContainer;
