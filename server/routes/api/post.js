import express from "express";
import auth from "../../middleware/auth";
import Post from "../../models/post";
import Category from "../../models/category";
import User from "../../models/user";
//파일들을 s3와주고받기위한 라이브러리
import multer from "multer";
import multerS3 from "multer-s3";
//경로등을 파악하기 쉽게 도움주는 라이브러리
import path from "path";
//AWS를 사용할수 있게 해주는 개발자 도구
import AWS from "aws-sdk";
import dotenv from "dotenv";
import moment from "moment";
import { isNullOrUndefined } from "util";
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
    console.log(req.files.map((v) => v.location));
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

router.get("/skip/", async (req, res) => {
  const postFindResult = await Post.find(); //find는 몽구스라이브러리
  res.json(postFindResult);
});

//포스트 작성
router.post("/", auth, uploadS3.none(), async (req, res, next) => {
  console.log("findResult:");
  try {
    const { title, contents, fileUrl, category } = req.body;
    //req.body.title, req.body.contents ...
    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      creator: req.user.id,
      date: moment().format("YYYY-MM-DD hh:mm:ss"),
      //title: title ..
    });
    //기존의 카테고리가 있는지 확인
    const findResult = await Category.findOne({
      categoryName: category,
    });
    console.log("findResult:", findResult);
    //없는 카테고리라면
    if (isNullOrUndefined(findResult)) {
      const newCategory = await Category.create({
        //새로운 카테고리 생성
        categoryName: category,
      });
      //포스트id를 찾아 포스트와 새로운카테고리를 연결
      await Post.findByIdAndUpdate(newPost._id, {
        $push: { catagory: newCategory._id },
      });
      //카테고리id를 찾아 카테고리와 새로운 포스터를 연결
      await Category.findByIdAndUpdate(newCategory._id, {
        $push: { posts: newPost._id },
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: { posts: newPost._id },
      });
    } else {
      //있는 카테고리라면
      await Category.findByIdAndUpdate(findResult._id, {
        $push: { posts: newPost._id },
      });
      await Post.findByIdAndUpdate(newPost._id, {
        catagory: findResult._id,
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: { posts: newPost._id },
      });
    }
    return res.redirect(`/api/post/${newPost._id}`);
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .popuplate("creator", "name")
      .popuplate({ path: category, select: "categoryName" });
  } catch (e) {
    console.log("ddd", e);
    next(e);
  }
});

export default router;
