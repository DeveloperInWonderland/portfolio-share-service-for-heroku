// ProjectEditForm>ProjectRadioForm
import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { MdCheckCircle, MdOutlineCancel } from "react-icons/md";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

const ProjectEditForm = ({ currentProject, setProjects, onClose }) => {

  const [title, setTitle] = useState(currentProject.title);
  const [description, setDescription] = useState(currentProject.description);
  const [from_date, setFromDate] = useState(new Date(currentProject.from_date))
  const [to_date, setToDate] = useState(new Date(currentProject.to_date))

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentProject의 user_id를 user_id 변수에 할당함.
    const { user_id } = currentProject;

    // "projects/프로젝트 id" 엔드포인트로 PUT 요청함.
    await Api.put(`projects/${currentProject.id}`, {
      user_id,
      title,
      description,
      from_date,
      to_date
    });

    // "projects/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("projectlist", user_id);
    setProjects(res.data);
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="프로젝트 제목"
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
      <Form.Group controlId="formBasicFromDate" className="mt-3">
        <span>시작일</span>
        <DatePicker
          className="custom-datePicker"
          dateFormat="yyyy/MM/dd"
          selected={from_date}
          onChange={(date) => { setFromDate(date) }}
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
          onChange={(date) => { setToDate(date) }}
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

export default ProjectEditForm;
