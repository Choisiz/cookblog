import jwt from "jsonwebtoken";
import config from "../config/index";
const { JWT_SECRET } = config;

//인증처리(토큰검증)
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ sucess: false, message: "토큰없음" });
  }
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.user = decode;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ sucess: false, message: "토큰이 유효하지 않음" });
  }
};

export default auth;
