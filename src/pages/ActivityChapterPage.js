import React, { useEffect, useState } from 'react';
import ChapterDetail from '../components/detail/ChapterDetail';
import { getListData } from '../modules/api';

const ActivityChapterPage = ({ match }) => {
  console.log('ActivityChapterPage match', match);
  const [chapterData, setChapterData] = useState();

  useEffect(() => {
    getListData(`/api${match.url}`, setChapterData);
  }, [match]);

  return (
    <div className="activity-chapter-page">
      {console.log('activityChapterDetail', chapterData)}
      {chapterData && <ChapterDetail chapterData={chapterData} match={match} />}
    </div>
  );
};

export default ActivityChapterPage;
