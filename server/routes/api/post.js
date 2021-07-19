import express from "express";
import auth from "../../middleware/auth";
import Post from "../../models/post";
//파일들을 s3와주고받기위한 라이브러리
import multer from "multer";
import multerS3 from "multer-s3";
//경로등을 파악하기 쉽게 도움주는 라이브러리
import path from "path";
//AWS를 사용할수 있게 해주는 개발자 도구
import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

//AWS S3에 file 업로드하기
const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: "cookblogs/upload",
    region: "ap-northeast-2",
    key: function (req, file, cb) {
      //확장자
      const ext = path.extname(file.originalname);
      //파일명
      const basename = path.basename(file.originalname, ext);
      //파일명+날짜+확장자
      cb(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});

//route POST api/post/image
//포스트 업로드
router.post("/image", uploadS3.array("upload", 5), async (req, res, next) => {
  try {
    console.log("dddd");
    res.json({
      uploaded: true,
      url: req.files.map((v) => v.location),
    });
  } catch (e) {
    console.log("www");
    res.json({
      uploaded: false,
      url: null,
    });
  }
});

router.get("/", async (req, res) => {
  const postFindResult = await Post.find(); //find는 몽구스라이브러리
  res.json(postFindResult);
});

//몽구스 메소드를 사용시엔 async ,await를 쓰자
//다른방법으로는 .exec()가 있다.
router.post("/", auth, async (req, res, next) => {
  try {
    const { title, contents, fileUrl, creator } = req.body;
    //req.body.title, req.body.contents ...
    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      creator,
      //title: title ..
    });
    res.json(newPost);
  } catch (e) {
    console.log(e);
  }
});

export default router;
