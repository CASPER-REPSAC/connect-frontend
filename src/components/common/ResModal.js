import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Button from './Button';

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
      {console.log('show', show)}
      <Modal.Body>
        <div>
          {show.res === undefined && (
            <>
              <div className="text-center">
                {show.msg || '요청하시겠습니까?'}
              </div>
              <div className="text-center">
                <Button onClick={show.handleClose}>취소</Button>
                <Button
                  margin="0 0 0 5px"
                  background="#8B0000"
                  onClick={() => {
                    console.log('modal request');
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
                {show.msgSuccess || '요청에 성공하였습니다.'}
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
                {show.msgFail || '요청에 실패하였습니다.'}
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
