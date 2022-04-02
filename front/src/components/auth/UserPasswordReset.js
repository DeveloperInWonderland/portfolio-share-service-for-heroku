import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useAlert } from "react-alert";

import * as Api from "../../api";
import * as validateEmail from "../common/utils";

function LoginForm() {
  const navigate = useNavigate();

  // useAlert로 alert 함수 이용함.
  const alert = useAlert()

  // useState로 currentEmail 상태를 생성함.
  const [name, setName] = useState("");
  // useState로 password 상태를 생성함.
  const [email, setEmail] = useState("");

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "/reset-password" 엔드포인트로 post요청함.
      await Api.post("reset-password", {
        name,
        email
      });
      alert.success("임시 비밀번호가 발급되었습니다.")
      alert.success("이메일로 전송된 비밀번호로 재로그인한 뒤 비밀번호를 변경해주세요.")
      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
      
    } catch (err) {
      alert.error('일치하는 사용자 정보가 없습니다.')
      console.log("변경에 실패하였습니다.\n", err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col lg={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mt-3">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email" className="mt-3">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mt-5 text-center">
              <Col>
                <Button variant="primary" type="submit" disabled={!isEmailValid}>
                  확인
                </Button>
                {'     '}
                <Button variant="outline-primary" onClick={() => navigate("/")}>
                  취소
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
