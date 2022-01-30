import React from 'react';
import Button from '../common/Button';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
  inputDiscriptionHandler,
  match,
}) => {
  const { title, type } = activityDetail;
  const onBtnClick = () => {
    window.location.href = `/activities/${match.params.activityId}`;
  };

  return (
    <div className="chapter-form" style={{ maxWidth: '700px' }}>
      <label htmlFor="subject" className="no-margin">
        <h5 className="needed">Title</h5>{' '}
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
        <h5 className="needed">Content</h5>
      </label>
      <br />

      <CKEditor
        editor={ClassicEditor}
        data={chapterInput.article || ''}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          inputDiscriptionHandler(data);
        }}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
      />
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
            style={{ minHeight: '41px' }}
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
      <label htmlFor="authString" className="mt-3">
        <h5 className="pw-label">Password</h5>
      </label>

      <input
        type="password"
        id="authString"
        name="authString"
        className="d-block"
        style={{ width: '200px' }}
        value={chapterInput.authString || ''}
        onChange={(e) => inputHandler(e.target)}
      />
      <div className="text-center">
        <Button background="gray" onClick={() => onBtnClick()}>
          취소
        </Button>
        <Button margin="0 0 0px 5px" onClick={() => submitChapter()}>
          작성
        </Button>
      </div>
      <br />
    </div>
  );
};

export default ChapterForm;
