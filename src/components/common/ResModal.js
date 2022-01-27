import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Button from './Button';
import NoCards from './NoCards';

export const ResSuccessModal = (show, handleClose, msg) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        {msg || '메세지 없음'}
        <Button variant="secondary" onClick={handleClose}>
          확인
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export const ResFailModal = (show, handleClose, msg, reRequest) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        {msg || '메세지 없음'}
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={() => reRequest()}>재요청</Button>
      </Modal.Body>
    </Modal>
  );
};

export const AskReqModal = (
  show,
  handleClose,
  msg,
  msgSuccess,
  msgFail,
  onRequest,
  res,
) => {
  return (
    <Modal show={show.show} onHide={show.handleClose}>
      <Modal.Body>
        <div>
          {show.res === undefined && (
            <>
              <div className="text-center">
                <NoCards msg={show.msg || '요청하시겠습니까?'} />
              </div>
              <div className="text-center">
                <Button onClick={show.handleClose}>취소</Button>
                <Button
                  margin="0 0 0 5px"
                  background="#8B0000"
                  onClick={() => {
                    show.onRequest();
                  }}
                >
                  확인
                </Button>
              </div>
            </>
          )}
          {show.res === true && (
            <>
              <div className="text-center">
                <NoCards msg={show.msgSuccess || '요청에 성공하였습니다.'} />
              </div>
              <div className="text-center">
                <Button
                  onClick={() => {
                    show.handleClose();
                    show.onSuccess();
                  }}
                >
                  확인
                </Button>
              </div>
            </>
          )}
          {show.res === false && (
            <>
              <div className="text-center">
                <NoCards msg={show.msgFail || '요청에 실패하였습니다.'} />
              </div>
              <div className="text-center">
                <Button onClick={show.handleClose}>취소</Button>
                <Button
                  margin="0 0 0 5px"
                  background="#8B0000"
                  onClick={() => show.onRequest()}
                >
                  재요청
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export const AskPasswordModal = (
  show,
  handleClose,
  msg,
  msgSuccess,
  msgFail,
  res,
) => {
  const [password, setPassword] = useState(null);
  const onChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <Modal show={show.show} onHide={show.handleClose}>
      <Modal.Body>
        <div>
          {show.res === undefined && (
            <>
              <div className="d-flex justify-content-around">
                <NoCards
                  msg={show.msg || '아직 참여자는 챕터를 작성할 수 없습니다.'}
                />
              </div>
              <div className="text-center">
                <input
                  type="password"
                  className="m-1 rounded"
                  value={password || ''}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              </div>
              <div className="text-center">
                <Button onClick={show.handleClose}>취소</Button>
                <Button
                  margin="0 0 0 5px"
                  background="#8B0000"
                  onClick={() => {
                    // show.onRequest();
                    show.handleClose();
                  }}
                >
                  확인
                </Button>
              </div>
            </>
          )}
          {show.res === true && (
            <>
              <div className="text-center">
                <NoCards
                  msg={show.msgSuccess || '비밀번호가 일치하지 않습니다.'}
                />
              </div>
              <div className="text-center">
                <Button
                  onClick={() => {
                    show.handleClose();
                    show.onSuccess();
                  }}
                >
                  확인
                </Button>
              </div>
            </>
          )}
          {show.res === false && (
            <>
              <div className="text-center">
                <NoCards msg={show.msgFail || '요청에 실패하였습니다.'} />
              </div>
              <div className="text-center">
                <Button onClick={show.handleClose}>취소</Button>
                <Button
                  margin="0 0 0 5px"
                  background="#8B0000"
                  onClick={() => show.onRequest()}
                >
                  재요청
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export const AskModal = (show, handleClose, msg, onRequest) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        {msg || '메세지 없음'}
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="secondary" onClick={() => onRequest()}>
          재요청
        </Button>
      </Modal.Body>
    </Modal>
  );
};
