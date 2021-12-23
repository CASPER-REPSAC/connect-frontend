import React from 'react';
import Button from '../common/Button';

const ChapterForm = ({
  activityDetail,
  inputHandler,
  chapterInput,
  onFileChange,
  submitChapter,
  update,
  onFileDelete,
  onFileUnDelete,
  targetFiles,
}) => {
  const { title, type } = activityDetail;
  console.log('ChapterForm - activityDetail', activityDetail);

  return (
    <div className="chapter-form">
      {console.log('chapterfore')}

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
      <label htmlFor="inputFile" className="d-flex">
        <h5>Files</h5>
        <small className="m-1 text-muted">
          파일은 3개까지 업로드 할 수 있습니다.
        </small>
      </label>
      <input
        type="file"
        name="files"
        onChange={(e) => onFileChange(e)}
        multiple
        files={targetFiles}
        style={{ display: 'block' }}
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
      {update && (
        <>
          <label htmlFor="inputFile" className="d-flex">
            <h5>Existing Files</h5>
            <small className="m-1 text-muted">
              클릭해서 삭제할 파일을 지정할 수 있습니다.
            </small>
          </label>

          <div
            className="input-box d-flex justify-content-start"
            onChange={(e) => onFileChange(e)}
          >
            {chapterInput.current_files.map((file, index) => (
              <div
                key={index}
                style={{ marginLeft: '5px' }}
                onClick={
                  chapterInput.file_delete.includes(file.filepath)
                    ? () => onFileUnDelete(file.filepath)
                    : () => onFileDelete(file.filepath)
                }
              >
                {chapterInput.file_delete.includes(file.filepath) ? (
                  <del>{file.filename}</del>
                ) : (
                  <>{file.filename}</>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      <br />
      <Button onClick={() => submitChapter()}>작성</Button>
      <br />
    </div>
  );
};

export default ChapterForm;
