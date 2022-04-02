import jwt from "jsonwebtoken";

// refresh token을 이용해 access token 재발급
export default (req, res) => {
    try {
        // 전달받은 cookie에서 refresh token 가져와 검증하고 user_id 추출
        const refreshToken = req.cookies.refreshToken;
        const jwtDecoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
        const user_id = jwtDecoded.user_id;
        const currentUserId = req.body.user_id;

        // 새로 access token 발급해서 전송
        if (user_id === currentUserId) {
            const newAccessToken = jwt.sign({ user_id: user_id }, process.env.JWT_SECRET_KEY, {expiresIn: '2h'});
            return res.status(401)
                .json({
                    'newAccessToken': newAccessToken,
                });
            }
            return res.status(400).send(`Token Error: 유효한 사용자가 아닙니다.`)

    } catch(error) {
        return res.status(400).send(`Token Error: ${error}`)
    }
}