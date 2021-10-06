import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import BallonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { FaRegCommentDots, FaEye } from "react-icons/fa";
import {
  POST_DELETE_REQUEST,
  POST_DETAIL_REQUEST,
  USER_LOADING_REQUEST,
} from "../../redux/types";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import Comments from "../../components/comments/Comments";
import { GrowingSpinner } from "../../components/Spinners/Spinners";
const PostDetail = (req) => {
  const dispatch = useDispatch();
  const { postDetail, creatorId, title, isLoading } = useSelector(
    (state) => state.post
  );
  const { userId, userName } = useSelector((state) => state.login);
  const { comments } = useSelector((state) => state.comment);
  useEffect(() => {
    dispatch({
      type: POST_DETAIL_REQUEST,
      payload: req.match.params.id,
    });
    dispatch({
      //삭제버튼은 로그인한 유저만 보이게
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem("token"),
    });
  }, [dispatch, req.match.params.id]);

  const onDeleteClick = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: req.match.params.id,
        token: localStorage.getItem("token"),
      },
    });
  };

  const EditButton = (
    <>
      <Row className="mb-3 border-bottom">
        {postDetail && postDetail.creator ? (
          <div className="mt-5">
            <div>
              <div style={{ fontSize: "18px", color: "#6bacce" }}>
                <strong>{postDetail.category.categoryName}</strong>
              </div>
              <div style={{ fontSize: "34px", marginLeft: "5px" }}>
                {postDetail.title}
              </div>
            </div>
            <div
              className="align-items-center d-flex mb-2"
              style={{
                fontSize: "15px",
                color: "#AAA7A7",
              }}
            >
              <div className="m-1">{postDetail.creator.name}</div>
              <div className="m-1"> | </div>
              <div className="m-1">{postDetail.date}</div>
              <div className="m-1"> | </div>
              <Link
                to={`/post/${req.match.params.id}/edit`}
                className="m-1 text-decoration-none"
                style={{ color: "#AAA7A7" }}
              >
                수정
              </Link>
              <div className="m-1"> | </div>
              <Link
                to=""
                className="m-1 text-decoration-none"
                style={{ color: "#AAA7A7" }}
                onClick={onDeleteClick}
              >
                삭제
              </Link>
            </div>
          </div>
        ) : null}
      </Row>
    </>
  );

  const HomeButton = (
    <>
      <Row className="mb-3 border-bottom">
        {postDetail && postDetail.creator ? (
          <div className="mt-5">
            <div>
              <div style={{ fontSize: "18px", color: "#6bacce" }}>
                <strong>{postDetail.category.categoryName}</strong>
              </div>
              <div style={{ fontSize: "34px", marginLeft: "5px" }}>
                {postDetail.title}
              </div>
            </div>
            <div
              className="align-items-center d-flex mb-2"
              style={{
                fontSize: "15px",
                color: "#AAA7A7",
              }}
            >
              <div className="m-1">{postDetail.creator.name}</div>
              <div className="m-1"> | </div>
              <div className="m-1">{postDetail.date}</div>
            </div>
          </div>
        ) : null}
      </Row>
    </>
  );
  const Body = (
    <Fragment>
      {userId === creatorId ? EditButton : HomeButton}
      {postDetail && postDetail.comments ? (
        <Fragment>
          <div className="d-flex justify-content-end align-items-baseline small">
            <FaRegCommentDots className="m-1" />
            <span className="m-1">{postDetail.comments.length}</span>
            <FaEye className="m-1" />
            <span className="m-1">{postDetail.views}</span>
          </div>
          <Row className="mb-5">
            <CKEditor
              editor={BallonEditor}
              data={postDetail.contents}
              config={editorConfiguration}
              disabled="true"
            />
          </Row>
          <Row className="mt-5">
            <div style={{ fontSize: "25px" }} className="mt-2 mb-2">
              {postDetail.comments.length} Comments
            </div>
            <Container className="mb-3">
              {Array.isArray(comments)
                ? comments.map(
                    ({ contents, creator, date, _id, creatorName }) => (
                      <div key={_id} className="border-top p-2">
                        <div className="d-flex mb-1">
                          <div
                            style={{ fontSize: "20px", marginRight: "10px" }}
                          >
                            {creatorName ? creatorName : creator}
                          </div>
                          <div
                            className="d-flex align-items-center"
                            style={{ fontSize: "12px", color: "#A7A7A7" }}
                          >
                            <span>{date.split(" ")[0]}</span>
                            <span>{date.split(" ")[1]}</span>
                          </div>
                        </div>
                        <Row style={{ fontSize: "16px" }}>
                          <div>{contents}</div>
                        </Row>
                      </div>
                    )
                  )
                : "Creator"}
              <Comments
                id={req.match.params.id}
                userId={userId}
                userName={userName}
              />
            </Container>
          </Row>
        </Fragment>
      ) : (
        <h1>hi</h1>
      )}
    </Fragment>
  );
  return (
    <div>
      <Helmet title={`${title}`} />
      {isLoading === true ? GrowingSpinner : Body}
    </div>
  );
};

export default PostDetail;
