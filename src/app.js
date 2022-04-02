import cors from "cors";
import express from "express";
import { userAuthRouter } from "./routers/userRouter";
import { awardAuthRouter } from "./routers/awardRouter";
import { educationRouter } from "./routers/educationRouter";
import { certificateRouter } from "./routers/certificateRouter";
import { projectRouter } from "./routers/projectRouter";
import { blogRouter } from "./routers/blogRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();
// 쿠키를 쉽게 추출하기 위해 도와주는 middleware 
const cookieParser = require('cookie-parser');

// CORS 에러 방지, credential 인증 추가
app.use(cors({
    origin: `${process.env.SERVER_URL}`,
    credentials: true
}));

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie-parser middleware 적용
app.use(cookieParser());

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use(userAuthRouter);
app.use(educationRouter);
app.use(certificateRouter);
app.use(projectRouter);
app.use(blogRouter);
app.use(awardAuthRouter);

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

import path from "path"
app.use(express.static(path.join(__dirname, "../front", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../front", "build", "index.html"));
});

export { app };
