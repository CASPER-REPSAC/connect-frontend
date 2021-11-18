import React, { useState } from 'react';
import axios from 'axios';

// /activities/:activityId/chapter/:chapterId
const FileUploadTest = ({ match }) => {
  const { activityId, chapterId } = match.params;
  const [file, setFile] = useState();

  // async function uploadChapterFile(activityId, chapterId, filePath, fileBlob) {

  const uploadChapterFile = async () => {
    const formData = new FormData();
    formData.append('files', file);
    await axios
      .post(
        `/api/activites/${activityId}/chapter/${chapterId}/11.zip`,
        formData,
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <br />
      <br />
      <h1>File Upload Test</h1>
      <small>
        {`/api/activities/${activityId}/chapter/${chapterId}/11.zip`}로 요청
        보내는 중
      </small>
      <input
        type="file"
        name="files"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={uploadChapterFile}>submit</button>
    </>
  );
};

export default FileUploadTest;
