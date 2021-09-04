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
    res.status(400).json({ message: e.message });
  }
});

//register
router.post("/", (req, res) => {
  const { name, email, password, rePassword } = req.body;
  if (!name || !email || !password || !rePassword) {
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
      rePassword,
    });
    if (password === rePassword) {
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
    } else {
      res.status(400).json({ sucess: false, message: "비밀번호가 틀립니다" });
    }
  });
});

//edit password
router.post("/:userName/profile", auth, async (req, res) => {
  try {
    const { prePassword, password, rePassword, userId } = req.body;
    if (!prePassword || !password || !rePassword) {
      return res.status(400).json({ allMassage: "빈칸을 입력해주세요" });
    }
    const result = await User.findById(userId, "password");
    bcrypt.compare(prePassword, result.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({
          preMessage: "비밀번호가 일치하지 않습니다",
        });
      } else {
        if (password === rePassword) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              result.password = hash;
              result.save();
            });
          });
          res.status(200).json({
            successMassage: true,
          });
        } else {
          res.status(400).json({
            errorMassage: "새 비밀번호를 확인해주세요",
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;
