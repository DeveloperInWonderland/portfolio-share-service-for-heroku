import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useAlert } from "react-alert";

import * as Api from "../../api";

function LoginForm() {
  const navigate = useNavigate();

  // useAlert로 alert 함수 이용함.
  const alert = useAlert()
  // useState로 currentEmail 상태를 생성함.
  const [currentPassword, setCurrentPassword] = useState("");
  // useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  // useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");

  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isPasswordValid && isPasswordSame;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "/change-password" 엔드포인트로 post요청함.
      await Api.post("change-password", {
        oldpassword: currentPassword,
        password,
        passwordConfirm: password
      });

      alert.success('비밀번호가 변경되었습니다.')

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      alert.error('현재 비밀번호와 일치하지 않습니다.')
      console.log("변경에 실패하였습니다.\n", err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col lg={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="currentPassword" className="mt-3">
              <Form.Label>현재 비밀번호</Form.Label>
              <Form.Control
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="changePassword" className="mt-3">
              <Form.Label>변경할 비밀번호</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isPasswordValid && (
                <Form.Text className="text-success">
                  비밀번호는 4글자 이상입니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="registerConfirmPassword" className="mt-3">
              <Form.Label>비밀번호 재확인</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!isPasswordSame && (
                <Form.Text className="text-success">
                  비밀번호가 일치하지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mt-5 text-center">
              <Col>
                <Button variant="primary" type="submit" disabled={!isFormValid}>
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
