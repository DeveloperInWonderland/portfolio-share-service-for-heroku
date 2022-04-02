import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { MdCheckCircle, MdOutlineCancel } from "react-icons/md";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

const CertificateEditForm = ({ currentCertificate, setCertificates, onClose }) => {

  // useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentCertificate.title);
  // useState로 description 상태를 생성함.
  const [description, setDescription] = useState(currentCertificate.description);
  // useState로 when_date 상태를 생성함.
  const [when_date, setWhenDate] = useState(new Date(currentCertificate.when_date))

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentCertificate의 user_id를 user_id 변수에 할당함.
    const { user_id } = currentCertificate;

    // "certificates/프로젝트 id" 엔드포인트로 PUT 요청함.
    await Api.put(`certificates/${currentCertificate.id}`, {
      user_id,
      title,
      description,
      when_date,
    });

    // "certificatelist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("certificatelist", user_id);
    setCertificates(res.data);
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="자격증 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세 내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicWhenDate" className="mt-3">
        <span>취득일</span>
        <DatePicker
          className="custom-datePicker"
          dateFormat="yyyy/MM/dd"
          selected={when_date}
          onChange={(date) => { setWhenDate(date) }}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            <MdCheckCircle size="22" style={{ marginBottom: 3 }} />&nbsp;
            확인
          </Button>
          <Button variant="secondary" onClick={() => onClose()}>
            <MdOutlineCancel size="22" style={{ marginBottom: 3 }} />&nbsp;
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default CertificateEditForm;
