import React, { useState, useEffect } from 'react';
import ChapterForm from './ChapterForm';
import axios from 'axios';

const WriteChapters = ({ match }) => {
  const { id } = match['params'];
  const [activityTitle, setActivityTitle] = useState('');
  useEffect(() => {
    axios.get(`/api/${id}`).then((response) => {
      if (response['data'][0]['title']) {
        setActivityTitle(response['data'][0]['title']);
      }
    });
  }, [id]);
  const [chapters, setChapters] = useState([
    {
      chapterId: 1,
      subject: '',
      article: '',
    },
    {
      chapterId: 2,
      subject: '',
      article: '',
    },
    {
      chapterId: 3,
      subject: '',
      article: '',
    },
  ]);
  return (
    <div>
      {chapters.map((v) => (
        <ChapterForm
          key={v['chapterId']}
          chapterId={v['chapterId']}
          activityId={id}
          activityTitle={activityTitle}
        />
      ))}
    </div>
  );
};

export default WriteChapters;
