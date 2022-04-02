import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useAlert } from "react-alert";

import * as Api from "../../api";

function RegisterForm() {
  const navigate = useNavigate();

  // useAlert로 alert 함수 이용함.
  const alert = useAlert()

  // useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  // useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  // useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");
  // useState로 name 상태를 생성함.
  const [name, setName] = useState("");

  // useState로 imageBase64, image 상태를 생성함.
  const [imageBase64, setImageBase64] = useState([]);
  const [image, setImage] = useState(null)

  // 이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;
  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  // 이미지 업로드를 위한 함수
  const handleImageUpload = (e) => {
    e.preventDefault();
    setImage(e.target.files);
    setImageBase64([])
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onloadend = () => {
          const base64 = reader.result;
          if (base64) {
            let base64Sub = base64.toString();
            setImageBase64(current => [...current, base64Sub])
          }
        }
      }
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userFormData = new FormData();
    if (!image) {userFormData.append("image", "")}
    else {Object.values(image).forEach((file) => userFormData.append("image", file));}
    
    userFormData.append("email", email);
    userFormData.append("password", password)
    userFormData.append("name", name);
    
    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.imgPost("user/register", userFormData);
      alert.success('회원가입이 완료되었습니다.')
      alert.success('이메일로 전송된 로그인 인증을 마무리해주세요.')
      // 로그인 페이지로 이동함.
      navigate("/login");
    } catch (err) {
      if (err.response.data==='"이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."') {
        alert.error('이 이메일은 현재 사용중입니다.')
        alert.error('다른 이메일을 입력해 주세요.')
      } else {
        alert.error('회원가입에 실패하였습니다. \n 다시 한 번 시도해주세요.')
      }
      
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col lg={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="registerEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control
                type="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="registerPassword" className="mt-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isPasswordValid && (
                <Form.Text className="text-success">
                  비밀번호는 4글자 이상으로 설정해 주세요.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="registerConfirmPassword" className="mt-3">
              <Form.Label>비밀번호 재확인</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!isPasswordSame && (
                <Form.Text className="text-success">
                  비밀번호가 일치하지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="registerName" className="mt-3">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {!isNameValid && (
                <Form.Text className="text-success">
                  이름은 2글자 이상으로 설정해 주세요.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="registerImage" className="mt-3">
              <Form.Label>프로필 이미지 업로드</Form.Label>
              <Form.Control
                type="file"
                autoComplete="off"
                multiple="multiple"
                onChange={handleImageUpload}
                accept ='image/*'
              />
              {imageBase64.map((item) => {
                return (
                  <img
                    className="d-block w-100"
                    src={item}
                    value={image}
                    alt="First Slide"
                    style={{ width: "100%", height: "550px" }}
                  />
                )
              })}
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="primary" type="submit" disabled={!isFormValid}>
                  회원가입
                </Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="light" onClick={() => navigate("/login")}>
                  로그인하기
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterForm;
