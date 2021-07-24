import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import mongoose from "mongoose";
import morgan from "morgan";
import config from "./config";
import postRoute from "./routes/api/post";
import userRoute from "./routes/api/user";
import loginRoute from "./routes/api/login";
import cors from "cors";
const app = express();
const { MONGO_URI } = config;

app.use(hpp());
//브라우저가 다른 도메인이나, 다른포트 서버에서 자원요청가능하게 해줌
//보통 싱글페이지 애플리케이션에서는 서버에서 설정
// origin:허락하고자 하는 주소 true먄 모두허용
// Credential: 지금설정한 cors설정을 브라우저 헤더에 추가
app.use(helmet());
app.use(cors({ origin: true, Credential: true }));
app.use(morgan("dev"));
app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB연결완료"))
  .catch((e) => console.log("DB연결에러:", e));

//router
app.use("/api/post", postRoute);
app.use("/api/user", userRoute);
app.use("/api/login", loginRoute);
export default app;
