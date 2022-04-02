// EduEditForm>EduRadioForm
import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { MdCheckCircle, MdOutlineCancel } from "react-icons/md";
import * as Api from "../../api";
import EduRadioForm from "./EduRadioForm";

function EduEditForm({ currentEdu, setEdus, onClose }) {

  // useState로 school 상태를 생성함.
  const [school, setSchool] = useState(currentEdu.school);
  // useState로 major 상태를 생성함.
  const [major, setMajor] = useState(currentEdu.major);
  // useState로 position 상태를 생성함.
  const [position, setPosition] = useState(currentEdu.position);

  // 추가하려는 정보가 입력됐는지 여부를 확인함.
  const isSchoolValid = !!school;
  const isMajorValid = !!major;
  const isPositionValid = position != null

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentEdu의 user_id를 user_id 변수에 할당함.
    const { user_id } = currentEdu;

    // "educations/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`educations/${currentEdu.id}`, {
      user_id,
      school,
      major,
      position,
    });

    // "educationlist/유저 id" 엔드포인트로 GET 요청함.
    const res = await Api.get("educationlist", user_id);
    // edus를 response의 data로 세팅함.
    setEdus(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicSchool">
        <Form.Control
          type="text"
          placeholder="학교 이름"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          required
        />
        {!isSchoolValid && (
          <Form.Text className="text-success m-2">
            학교 이름 입력 필수
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formBasicMajor" className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          required
        />
        {!isMajorValid && (
          <Form.Text className="text-success m-2">
            전공 입력 필수
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group controlId="formBasicRadio" >
        <EduRadioForm
          position={position}
          setPosition={setPosition}
        />
        {!isPositionValid && (
          <Form.Text className="text-success m-2">
            학위 선택 필수
          </Form.Text>
        )}
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
}

export default EduEditForm;
