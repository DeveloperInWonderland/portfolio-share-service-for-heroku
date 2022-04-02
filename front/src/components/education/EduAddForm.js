// Edus>EduAddForm>EduRadioForm
import React, { useState } from "react";
import { Button, Col, Row, Form, FloatingLabel } from "react-bootstrap";
import { MdCheckCircle, MdOutlineCancel } from "react-icons/md";
import * as Api from "../../api";
import EduRadioForm from "./EduRadioForm";

function EduAddForm({ portfolioOwnerId, setEdus, onClose }) {
  // useState로 school 상태를 생성함.
  const [school, setSchool] = useState("");
  // useState로 major 상태를 생성함.
  const [major, setMajor] = useState("");
  // useState로 position 상태를 생성함.
  const [position, setPosition] = useState();

  // 추가하려는 정보가 입력됐는지 여부를 확인함.
  const isSchoolValid = !!school;
  const isMajorValid = !!major;
  const isPositionValid = position != null

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId;
    // "education/create" 엔드포인트로 post요청함.
    await Api.post("education/create", {
      user_id,
      school,
      major,
      position,
    });

    // "educatonlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("educationlist", user_id);
    // edus를 response의 data로 세팅함.
    setEdus(res.data);
    // edu를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mt-3">
        <Col md>
          <Form.Group controlId="formBasicSchool">
            <FloatingLabel
              controlId="floatingInput"
              label="학교 이름"
              className="mb-3"
              style={{ color: "#0D0900" }}
            >
              <Form.Control
                type="text"
                placeholder="학교 이름"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                required
              />
            </FloatingLabel>
            {!isSchoolValid && (
              <Form.Text className="text-success m-2">
                학교 이름 입력 필수
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group controlId="formBasicMajor" >
            <FloatingLabel
              controlId="floatingInput"
              label="전공"
              className="mb-3"
              style={{ color: "#0D0900" }}
            >
              <Form.Control
                type="text"
                placeholder="전공"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                required
              />
            </FloatingLabel>
            {!isMajorValid && (
              <Form.Text className="text-success m-2">
                전공 입력 필수
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="formBasicRadio">
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


      <Form.Group as={Row} className="mt-3 text-center">
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

export default EduAddForm;
