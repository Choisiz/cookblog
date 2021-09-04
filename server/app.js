import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import mongoose from "mongoose";
import morgan from "morgan";
import config from "./config";
import postRoute from "./routes/api/post";
import userRoute from "./routes/api/user";
import loginRoute from "./routes/api/login";
import searchRoute from "./routes/api/search";
import cors from "cors";
import path from "path";
const app = express();
const { MONGO_URI } = config;
const prod = process.env.NODE_ENV === "production";

app.use(hpp());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
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
app.use("/api/search", searchRoute);

if (prod) {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

export default app;
