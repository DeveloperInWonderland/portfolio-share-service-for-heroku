import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import { DispatchContext } from "../../App";

function GithubLogin() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useContext(DispatchContext);

    useEffect(() => {
        const login = async () => {
            try {
                const code = new URLSearchParams(location.search);
                const user = await axios //
                    .get(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/login/github/callback?${code}`)
                    .then((res) => res.data);
                // JWT 토큰은 유저 정보의 token임.
                const jwtToken = user.token;
                // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
                sessionStorage.setItem("userToken", jwtToken);
                // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: user,
                });
            } catch (error) {
                console.log(`❌ Error: ${error}`);
            }

            // 기본 페이지로 이동함.
            navigate(`/`, { replace: true });
        };
        login();
    }, [location, navigate, dispatch]);

    return <div>Loading...</div>;
}

export default GithubLogin;
