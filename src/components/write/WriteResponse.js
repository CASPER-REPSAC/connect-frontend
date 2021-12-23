import React from 'react';
import Button from '../common/Button';
import { useHistory } from 'react-router-dom';
import { NoCards } from '../common/NoCards';

export const WriteResponse = ({
  res,
  resID,
  setSendCounter,
  submitActivity,
}) => {
  const history = useHistory();
  const routeChange = (path) => {
    history.push(path);
  };
  return (
    <div className="writeResponse">
      <div className="title">
        <NoCards
          msg={
            res === true
              ? '성공적으로 작성 되었습니다'
              : '작성에 실패하였습니다.'
          }
        />
      </div>
      <div className="body">
        <div style={{ maxWidth: '400px', fontSize: '13px' }} className="text">
          {res === true && (
            <>
              지금 바로 챕터를 작성할 수 있습니다. <br />
              Activity의 챕터를 작성하시겠습니까?
            </>
          )}
          {res === false && (
            <>
              인터넷 연결이나 서버의 문제일 수 있습니다. <br />
              다시 작성페이지로 갈까요?
            </>
          )}
        </div>
        <div className="button d-flex justify-content-center">
          <Button background="gray" onClick={() => routeChange('/')}>
            홈으로
          </Button>
          {res === true && (
            <Button
              style={{ marginLeft: '5px' }}
              onClick={() => routeChange(`/write/activities/${resID}`)}
            >
              챕터 작성
            </Button>
          )}
          {res === false && (
            <>
              <Button
                style={{ marginLeft: '5px' }}
                onClick={() => submitActivity()}
                background="MidnightBlue"
              >
                재요청
              </Button>
              <Button
                style={{ marginLeft: '5px' }}
                onClick={() => setSendCounter(0)}
              >
                돌아가기
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const UpdateResponse = ({
  res,
  resID,
  setSendCounter,
  submitActivity,
}) => {
  const history = useHistory();
  const routeChange = (path) => {
    history.push(path);
  };
  return (
    <div className="writeResponse">
      <div className="title">
        <NoCards
          msg={
            res === true
              ? '성공적으로 수정 되었습니다'
              : '수정에 실패하였습니다.'
          }
        />
      </div>
      <div className="body">
        <div style={{ maxWidth: '400px', fontSize: '13px' }} className="text">
          {res !== true && (
            <>
              인터넷 연결이나 서버의 문제일 수 있습니다. <br />
              다시 작성페이지로 갈까요?
            </>
          )}
        </div>
        <div className="button d-flex justify-content-center">
          <Button onClick={() => routeChange('/')}>홈으로</Button>
          {res === true && (
            <Button
              style={{ marginLeft: '5px' }}
              onClick={() => history.go(-1)}
              background="MidnightBlue"
            >
              보러가기
            </Button>
          )}

          {res !== true && (
            <>
              <Button
                style={{ marginLeft: '5px' }}
                onClick={() => submitActivity()}
                background="MidnightBlue"
              >
                재요청
              </Button>
              <Button
                style={{ marginLeft: '5px' }}
                onClick={() => setSendCounter(0)}
              >
                돌아가기
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const WriteChapterResponse = ({
  res,
  fileRes,
  fileFail,
  resID,
  setSendCounter,
  submitChapter,
  activityId,
}) => {
  const history = useHistory();
  const routeChange = (path) => {
    history.push(path);
  };
  return (
    <div className="writeResponse">
      <div className="title">
        <NoCards
          msg={
            res === true
              ? '챕터가 성공적으로 작성 되었습니다!'
              : '챕터 작성에 실패하였습니다.'
          }
        />
      </div>
      <div className="body">
        <div style={{ maxWidth: '400px', fontSize: '13px' }}>
          {res === true && fileRes === false && (
            <>
              하지만 파일 작성에 실패하였습니다. <br />
              실패한 파일:{' '}
              {fileFail.map((file, index) => (
                <span key={index}>{file}</span>
              ))}
            </>
          )}
          {res === false && (
            <>
              인터넷 연결이나 서버의 문제일 수 있습니다. <br />
              다시 작성페이지로 갈까요?
            </>
          )}
        </div>
        <div className="button d-flex justify-content-center">
          <Button background="gray" onClick={() => routeChange('/')}>
            홈으로
          </Button>
          {res === true && (
            <Button
              style={{ marginLeft: '5px' }}
              onClick={() =>
                routeChange(`/activities/${activityId}/chapter/${resID}`)
              }
            >
              보러가기
            </Button>
          )}
          {res === false && (
            <>
              <Button
                style={{ marginLeft: '5px' }}
                onClick={() => submitChapter()}
                background="MidnightBlue"
              >
                재요청
              </Button>
              <Button
                style={{ marginLeft: '5px' }}
                onClick={() => setSendCounter(0)}
              >
                돌아가기
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const DeleteResponse = ({ res, setSendCounter, submitActivity }) => {
  const history = useHistory();
  const routeChange = (path) => {
    history.push(path);
  };
  return (
    <div className="writeResponse">
      <div className="title">
        <NoCards
          msg={
            res === true ? '성공적으로 삭제 되었습니다' : '삭제하지 못했습니다.'
          }
        />
      </div>
      <div className="body">
        <div className="button d-flex justify-content-center">
          <Button background="gray" onClick={() => routeChange('/')}>
            홈으로
          </Button>

          {res !== true && (
            <>
              {console.log(res)}
              <Button
                style={{ marginLeft: '5px' }}
                onClick={() => submitActivity()}
                background="MidnightBlue"
              >
                재요청
              </Button>
              <Button
                style={{ marginLeft: '5px' }}
                onClick={() => setSendCounter(0)}
              >
                돌아가기
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const DeleteAsk = ({ setDeleteAsk, onDeleteActivity }) => {
  return (
    <div className="writeResponse">
      <div className="title">
        <NoCards msg={'정말 삭제하시겠습니까?'} />
      </div>
      <div className="body">
        <div className="button d-flex justify-content-center">
          <Button background="gray" onClick={() => setDeleteAsk(false)}>
            뒤로
          </Button>
          <Button
            background="#8B0000"
            style={{ marginLeft: '5px' }}
            onClick={() => onDeleteActivity()}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WriteResponse;
