import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { UserStateContext, DispatchContext } from "../../App";
import { useAlert } from "react-alert";
import OffCanvasForm from "./OffCanvasForm";
import * as Api from "../../api";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // useAlert로 alert 함수 이용함.
  const alert = useAlert();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    Api.post("/user/logout").then(() => {
      // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
      sessionStorage.removeItem("userToken");
      // dispatch 함수를 이용해 로그아웃함.
      dispatch({ type: "LOGOUT" });
      alert.info("로그아웃되었습니다.");
      // 기본 페이지로 돌아감.
      navigate("/");
    });
  };

  const oauth = userState.user?.oauth;

  return (
    <Nav activeKey={location.pathname} className="nav-text">
      <Nav.Item className="me-auto mb-5">
        {isLogin && (
          <Nav.Link onClick={handleShow}>
            안녕하세요, 🐰포트폴리오 공유 서비스입니다.
          </Nav.Link>
        )}
        <OffCanvasForm show={show} handleClose={handleClose} />
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigate("/")}>나의 페이지</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigate("/network")}>네트워크</Nav.Link>
      </Nav.Item>
      {isLogin && (
        <>
          {!oauth && (
            <Nav.Item>
              <Nav.Link onClick={() => navigate("/change-password")}>
                비밀번호 변경
              </Nav.Link>
            </Nav.Item>
          )}

          <Nav.Item>
            <Nav.Link onClick={logout}>로그아웃</Nav.Link>
          </Nav.Item>
        </>
      )}
    </Nav>
  );
}

export default Header;
