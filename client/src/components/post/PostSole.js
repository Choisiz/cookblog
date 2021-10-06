import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, CardTitle, Row, Button } from "reactstrap";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { POST_BOOKMARK_REQUEST } from "../../redux/types";
const PostSole = ({
  _id,
  title,
  fileUrl,
  views,
  comments,
  bookmark,
  contentsRegEx,
  contentsOpen,
  contentsClose,
}) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.login);
  let trueAndFalse = bookmark.trueAndFalse;
  const bookmarkId = bookmark._id;
  const postId = _id;
  const token = localStorage.getItem("token");
  const [isBookmarkd, setIsBookmarkd] = useState(trueAndFalse);
  const toggleBookmark = () => {
    if (isBookmarkd === false) {
      setIsBookmarkd(true);
    } else {
      setIsBookmarkd(false);
    }
  };

  useEffect(() => {
    const body = { isBookmarkd, userId, token, postId, bookmarkId };
    dispatch({
      type: POST_BOOKMARK_REQUEST,
      payload: body,
    });
  }, [dispatch, isBookmarkd]);

  return (
    <div key={postId} className="col-md-4">
      <div className="mb-3">
        <Button onClick={toggleBookmark} style={{ fontSize: "0px" }}>
          {isBookmarkd ? (
            <BsFillBookmarkFill
              style={{ color: "#FFC107", fontSize: "25px", cursor: "pointer" }}
            />
          ) : (
            <BsFillBookmarkFill
              style={{ cursor: "pointer", fontSize: "25px", cursor: "pointer" }}
            />
          )}
        </Button>
      </div>
      <Link to={`/post/${postId}`} className="text-dark text-decoration-none">
        <Card className="mb-3 hello">
          <CardImg top alt="이미지" src={fileUrl} />
          <CardBody>
            <CardTitle className="text-truncate d-flex justify-content-between">
              <div className="p-1" style={{ fontSize: "28px" }}>
                {title}
              </div>
            </CardTitle>
            <Row className="p-1">
              <div className="mb-3" style={{ fontSize: "16px" }}>
                {contentsRegEx.length >= 48 ? contentsClose : contentsOpen}
              </div>
              <div className="border-top">
                <div className="mt-2">
                  <span
                    style={{
                      marginRight: "20px",
                      fontSize: "12px",
                    }}
                  >
                    조회 {views}회
                  </span>
                  <span style={{ fontSize: "12px" }}>
                    댓글 {comments.length}회
                  </span>
                </div>
              </div>
            </Row>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default PostSole;
