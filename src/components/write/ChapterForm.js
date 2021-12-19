import React from 'react';
import Button from '../common/Button';

const ChapterForm = ({
  activityDetail,
  inputHandler,
  chapterInput,
  onFileChange,
  submitChapter,
}) => {
  const { title, type } = activityDetail;
  console.log('ChapterForm - activityDetail', activityDetail);

  return (
    <div className="chapter-form">
      {console.log('chapterfore')}
      <h3 className="no-margin">{title}</h3>
      <hr />
      <label htmlFor="subject" className="no-margin">
        <h5>Title</h5>
      </label>
      <br />
      <input
        type="text"
        id="subject"
        name="subject"
        value={chapterInput.subject || ''}
        onChange={(e) => inputHandler(e.target)}
      />
      <br />
      <label htmlFor="article">
        <h5>Content</h5>
      </label>
      <br />
      <textarea
        type="text"
        id="article"
        name="article"
        onChange={(e) => inputHandler(e.target)}
        value={chapterInput.article || ''}
      ></textarea>
      <br />
      <label htmlFor="inputFile">
        <h5>files</h5>
      </label>
      <br />
      <input
        type="file"
        name="files"
        onChange={(e) => onFileChange(e)}
        multiple
        // accept=".zip"
      />
      {console.log(chapterInput.files)}
      {Array.isArray(chapterInput.files) && chapterInput.files.length > 1 && (
        <>
          {chapterInput.files.map((file, index) => (
            <small className="text-muted" key={index}>
              {file.name}
              {index !== chapterInput.files.length - 1 && <>, </>}
            </small>
          ))}
        </>
      )}
      <br />
      <br />
      <Button onClick={() => submitChapter()}>작성</Button>
      <br />
    </div>
  );
};

export default ChapterForm;
