// Awards>AwardAddForm
import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { MdCheckCircle, MdOutlineCancel } from "react-icons/md";
import * as Api from "../../api";

function AwardAddForm({ portfolioOwnerId, setAwards, onClose }) {
  // useState로 title 상태를 생성함.
  const [title, setTitle] = useState("");
  // useState로 description 상태를 생성함.
  const [description, setDescription] = useState("");

  // 추가하려는 정보가 입력됐는지 여부를 확인함.
  const isTitleValid = !!title;
  const isDescriptionValid = !!description;

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId;

    // "award/create" 엔드포인트로 post요청함.
    await Api.post("award/create", {
      user_id,
      title,
      description,
    });

    // "awardlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("awardlist", user_id);
    // awards를 response의 data로 세팅함.
    setAwards(res.data);
    // award를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="수상내역"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {!isTitleValid && (
          <Form.Text className="text-success m-2">
            수상내역 입력 필수
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {!isDescriptionValid && (
          <Form.Text className="text-success m-2">
            상세내역 입력 필수
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3" >
            <MdCheckCircle size="22" style={{ marginBottom: 3 }} />
            &nbsp;확인
          </Button>
          <Button variant="secondary" onClick={() => onClose()}>
            <MdOutlineCancel size="22" style={{ marginBottom: 3 }} />
            &nbsp;취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default AwardAddForm;
