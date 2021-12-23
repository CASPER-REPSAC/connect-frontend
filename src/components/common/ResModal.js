import React from 'react';
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
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="secondary" onClick={() => reRequest()}>
          재요청
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export const AskReqModal = (show, handleClose, msg, onRequest) => {
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
