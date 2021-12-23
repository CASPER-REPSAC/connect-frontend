import React, { useEffect, useState } from 'react';
import ChapterDetail from '../components/detail/ChapterDetail';
import { getListData } from '../modules/api';

import Button from '../components/common/Button';

const ActivityChapterPage = ({ match, history }) => {
  // console.log('ActivityChapterPage match', match);
  const { params } = match;
  const [chapterData, setChapterData] = useState();

  useEffect(() => {
    getListData(`/api${match.url}/`, setChapterData);
  }, [match]);

  return (
    <div className="activity-chapter-page">
      {console.log('activityChapterDetail', chapterData)}
      {chapterData && <ChapterDetail chapterData={chapterData} match={match} />}
      <div className="d-flex justify-content-end">
        <Button
          width="content-fit"
          style={{ marginLeft: '5px' }}
          onClick={() => {
            history.push(
              `/write/activities/${params.activityId}/chapter/${params.chapterId}/update`,
            );
          }}
        >
          챕터 수정
        </Button>
      </div>
    </div>
  );
};

export default ActivityChapterPage;
