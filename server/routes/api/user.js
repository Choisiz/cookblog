import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user";
import config from "../../config/index";
import auth from "../../middleware/auth";
const router = express.Router();
const { JWT_SECRET } = config;
//전체 보기
//get
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error("유저가 없음");
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json({ sucess: false, message: e.message });
  }
});

//회원가입
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ sucess: false, message: "모든 사항 체크필요" });
  }

  //가입되어있는지 체크
  User.findOne({ email }).then((user) => {
    if (user) {
      //이미 존재한다면
      return res
        .status(400)
        .json({ sucess: false, message: "이미가입된유저입니다" });
    }
    const newUser = new User({
      name,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          //jwt.sign()인자들
          //userInfo, secretKey, options,
          jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

export default router;
