import express from "express";
import auth from "../../middleware/auth";
import Post from "../../models/post";

const router = express.Router();

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
