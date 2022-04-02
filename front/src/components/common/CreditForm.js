import React, { useState } from 'react';
import OffCanvasForm from './OffCanvasForm'

const CreditForm = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>안녕하세요</h1>
        <h2><span onClick={handleShow} className="h2-span-highlight">이상한 나라의 개발자들</span>의</h2>
        <h2>포트폴리오 공유 서비스입니다.</h2>
      </div>
      <OffCanvasForm show={show} handleClose={handleClose} />
    </>
  );
}

export default CreditForm;