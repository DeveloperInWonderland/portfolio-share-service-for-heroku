import jwt from "jsonwebtoken";
import refreshToken from "./refreshToken";


function login_required(req, res, next) {
    // request 헤더로부터 authorization bearer 토큰을 받음.
    const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

    // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열임.
    // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
    if (userToken === "null") {
        console.log("서비스 사용 요청이 있습니다. 하지만, Authorization 토큰: 없음");
        return res.status(400).send("로그인한 유저만 사용할 수 있는 서비스입니다.");
    }

    // 해당 token 이 정상적인 token인지 확인 -> 토큰에 담긴 user_id 정보 추출
    try {
        const jwtDecoded = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
        const user_id = jwtDecoded.user_id;
        req.currentUserId = user_id;
        next();
    } catch (error) {
        // access token이 만료된 경우, refreshToken으로 보내 새로 access token 발급
        if (error.message === "jwt expired") {
            refreshToken(req, res);
            return
        }
        return res.status(400).send(`Token Error: ${error}`);
    }
}

export { login_required };