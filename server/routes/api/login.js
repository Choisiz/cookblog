import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth";
import config from "../../config/index";
import User from "../../models/user";
const router = express.Router();
const { JWT_SECRET } = config;

//login
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ sucess: false, message: "모든 필드 작성요함" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ sucess: false, message: "유저존재하지 않습니다" });
  }
  //bcrypt.compare: 비밀번호 비교하기
  //first 인자: 입력한 비번, second 인자: 찾은 비번
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ sucess: false, message: "비밀번호가 다릅니다." });
  }
  jwt.sign(
    { id: user.id },
    JWT_SECRET,
    { expiresIn: "1 days" },
    (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }
  );
});

//logout
router.post("/logout", (req, res) => {
  res.json("로그아웃 성공");
});

//유저 데이터 받기(token과 함께)
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error("유저가 존재하지 않습니다");
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
});

export default router;
