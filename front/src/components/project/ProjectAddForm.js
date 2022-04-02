// Projects>ProjectAddForm>ProjectRadioForm
import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { MdCheckCircle, MdOutlineCancel } from "react-icons/md";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

const ProjectAddForm = ({ portfolioOwnerId, setProjects, onClose }) => {
  /* 
상태 생성
- title (프로젝트 제목) 
- description (상세 내역)
- from_date (시작일)
- to_date (종료일)
*/
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from_date, setFromDate] = useState(new Date());
  const [to_date, setToDate] = useState(new Date());

  const handsubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user_id = portfolioOwnerId;

    // 생성 ("project/create" 엔드포인트로 post요청함.)
    await Api.post("project/create", {
      user_id: portfolioOwnerId,
      title,
      description,
      from_date,
      to_date,
    });

    // (생성 후) 조회 ("projectlist/유저id" 엔드포인트로 get요청함.)
    const res = await Api.get("projectlist", user_id);
    setProjects(res.data);
    onClose();
  };

  return (
    <div>
      <Form onSubmit={handsubmit}>
        <Form.Group controlId="formBasicTitle" className="mt-3">
          <Form.Control
            type="text"
            placeholder="프로젝트 제목"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicDescription" className="mt-3">
          <Form.Control
            type="text"
            placeholder="상세 내역"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicFromDate" className="mt-3">
          <span>시작일</span>
          <DatePicker
            className="custom-datePicker"
            dateFormat="yyyy/MM/dd"
            selected={from_date}
            onChange={(date) => {
              setFromDate(date);
            }}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </Form.Group>
        <Form.Group controlId="formBasicToDate" className="mt-3">
          <span>종료일</span>
          <DatePicker
            className="custom-datePicker"
            dateFormat="yyyy/MM/dd"
            selected={to_date}
            onChange={(date) => {
              setToDate(date);
            }}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </Form.Group>
        <Form.Group as={Row} className="mt-3 text-center">
          <Col sm={{ span: 20 }}>
            <Button variant="primary" type="submit" className="me-3">
              <MdCheckCircle size="22" style={{ marginBottom: 3 }} />
              &nbsp; 확인
            </Button>
            <Button variant="secondary" onClick={() => onClose()}>
              <MdOutlineCancel size="22" style={{ marginBottom: 3 }} />
              &nbsp; 취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ProjectAddForm;
