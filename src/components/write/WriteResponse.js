import React from 'react';
import Button from '../common/Button';
import { useHistory } from 'react-router-dom';

const WriteResponse = ({ res, resID, setSendCounter }) => {
  const history = useHistory();
  const routeChange = (path) => {
    history.push(path);
  };
  return (
    <div className="writeResponse">
      <div className="title">
        {res === true && '성공적으로 작성 되었습니다!'}
        {res === false && '작성에 실패하였습니다.'}
      </div>
      <div className="body">
        <div className="text">
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
        <div className="button">
          <Button gray onClick={() => routeChange('/')}>
            홈으로
          </Button>
          {res === true && (
            <Button onClick={() => routeChange(`/write/${resID}`)}>
              챕터 작성
            </Button>
          )}
          {res === false && (
            <Button onClick={() => setSendCounter(0)}>돌아가기</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteResponse;
