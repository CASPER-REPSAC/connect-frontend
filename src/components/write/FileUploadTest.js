import React, { useState } from 'react';
import axios from 'axios';

// /activities/:activityId/chapter/:chapterId
const FileUploadTest = ({ match }) => {
  const [formData, setFormData] = useState(new FormData());
  const [fileName, setFileName] = useState('');
  // async function uploadChapterFile(activityId, chapterId, filePath, fileBlob) {
  console.log(match.url);

  const uploadChapterFile = async () => {
    await axios
      .post(`/api${match.url}/upload/${fileName}/`, formData, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const onChange = async (e) => {
    /* 
      api - uploadChapterFilen
      e.target.files[0]이랑 match.url만 넘겨줄 것
      - 파일명: e.target.files[0].name
      - url: match.url
    */
    if (e.target.files[0]) {
      console.log('name', e.target.files[0].name);
      let tmpFormData = new FormData();
      for (let i = 0; i < e.target.files.length; i++) {
        tmpFormData.append('file', e.target.files[i]);
      }
      // tmpFormData.append('file', e.target.files[0]);

      console.log(typeof tmpFormData);
      console.log(tmpFormData.getAll('file'));
      setFormData(tmpFormData);
      const filenametmp = e.target.value.split('\\');
      setFileName(filenametmp[filenametmp.length - 1]);
    }

    // await axios
    //   .post(
    //     `http://connects.casper.or.kr:30009/api${match.url}/upload/ddd.zip`,
    //     tmpFormData,
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     },
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
  };
  return (
    <>
      <br />
      <br />
      <h1>File Upload Test</h1>
      <small>{`/api${match.url}/upload/${fileName}`}로 요청</small>
      <br />
      <input
        type="file"
        name="files"
        onChange={(e) => onChange(e)}
        multiple
        // accept=".zip"
      />
      <br />
      <button onClick={uploadChapterFile}>submit</button>
    </>
  );
};

export default FileUploadTest;
