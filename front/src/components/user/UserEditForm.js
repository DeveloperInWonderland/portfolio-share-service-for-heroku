import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import { useAlert } from "react-alert";
import { confirmAlert } from 'react-confirm-alert';
import { DispatchContext } from "../../App";
import * as Api from "../../api";

function UserEditForm({ user, setIsEditing, setUser }) {
  const navigate = useNavigate();

  const dispatch = useContext(DispatchContext);

  // useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  // useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  // useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);

  // useState로 imageBase64, image 상태를 생성함.
  const [imageBase64, setImageBase64] = useState([]);
  const [image, setImage] = useState(null)

  // useState로 이미지 편집 상태를 생성함.
  const [isImageEdit, setIsImageEdit] = useState(false)

  // useAlert로 alert 함수 이용함.
  const alert = useAlert()

  // 이미지 업로드를 위한 함수
  const handleImageUpload = (e) => {
    e.preventDefault();
    setImage(e.target.files);
    setImageBase64([])
    setIsImageEdit(true)
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
    if (!image) { userFormData.append("image", "") }
    else { Object.values(image).forEach((file) => userFormData.append("image", file)); }

    userFormData.append("name", name);
    userFormData.append("description", description);

    // "user/current" 엔드포인트로 PUT 요청함.
    const res = await Api.imgPut(`user/current`, userFormData);
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  const withdrawal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    confirmAlert({
      title: '🚫 주의',
      message: '정말 떠나시게요?😥',
      buttons: [
        {
          label: '네! 탈퇴할게요.',
          onClick: () => {
            Api.delete("user/current")
              .then((res) => {
                alert.info('회원탈퇴 되었습니다.');
                // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
                sessionStorage.removeItem("userToken");
                // dispatch 함수를 이용해 로그아웃함.
                dispatch({ type: "LOGOUT" });
                // 기본 페이지로 돌아감.
                navigate("/");
              });
          }
        },
        {
          label: '아니요, 탈퇴 안할게요!',
        }
      ]
    });
  }

  return (
    <Card className="mb-2 ms-3 mr-5">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="EditImage" className="mt-3">
            {!isImageEdit ? (
              <Card.Img
                style={{ width: "10rem", height: "8.5rem" }}
                className="mb-3 user-card-img"
                src={user?.image}
                alt="회원가입 시 업로드 (AWS 버킷 사용)"
              />
            ) : (
              <>
                {
                  imageBase64.map((item) => {
                    return (
                      <img
                        className="my-3"
                        src={item}
                        value={image}
                        alt="First Slide"
                        style={{ width: "10rem", height: "8rem" }}
                      />
                    )
                  })
                }
              </>
            )}


            <Form.Control className="mb-3"
              type="file"
              autoComplete="off"
              multiple="multiple"
              onChange={handleImageUpload}
              accept='image/*'
            />
          </Form.Group>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
          <hr />
          <div onClick={withdrawal}>
            <p className="user-withdrawal-text">
              회원탈퇴
            </p>
          </div>

        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
