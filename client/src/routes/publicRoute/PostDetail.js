import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Button, Col, Row, Spinner } from "reactstrap";
import { Link } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import BallonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { BiTime } from "react-icons/bi";
import { FaRegCommentDots, FaEye } from "react-icons/fa";
import {
  POST_DELETE_REQUEST,
  POST_DETAIL_REQUEST,
  USER_LOADING_REQUEST,
} from "../../redux/types";
import { Fragment } from "react";
import { editorConfiguration } from "../../components/editor/EditorConfig";
const PostDetail = (req) => {
  const dispatch = useDispatch();
  const { postDetail, creatorId, title, isLoading } = useSelector(
    (state) => state.post
  );
  const { userId, userName } = useSelector((state) => state.login);
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
  }, []);
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
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-md-4 mr-md-3 justify-content-center">
          <Link to="/" className="btn btn-primary btn-block col-md-12">
            Home
          </Link>
        </Col>
        <Col className="col-md-4 mr-md-3">
          <Link
            to={`/post/${req.match.params.id}/edit`}
            className="btn btn-success btn-block col-md-12"
          >
            Edit post
          </Link>
        </Col>
        <Col className="col-md-4">
          <Button
            className="btn-block btn-danger col-md-12"
            onClick={onDeleteClick}
          >
            Delete
          </Button>
        </Col>
      </Row>
    </>
  );

  const HomeButton = (
    <>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-sm-12 com-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            Home
          </Link>
        </Col>
      </Row>
    </>
  );
  const Body = (
    <>
      {userId === creatorId ? EditButton : HomeButton}
      <Row className="border-bottom border-top border-primary p-3 mb-3 d-flex justify-content-between">
        {postDetail && postDetail.creator ? (
          <div className="d-flex flex-row justify-content-between">
            <div className="font-weight-bold text-big">
              <span className="m-3">
                <Button color="info">{postDetail.category.categoryName}</Button>
              </span>
              {postDetail.title}
            </div>
            <div className="align-items-center">{postDetail.creator.name}</div>
          </div>
        ) : null}
      </Row>
      {postDetail && postDetail.comments ? (
        <>
          <div className="d-flex justify-content-end align-items-baseline small">
            <BiTime className="m-1"></BiTime>
            <span className="m-1">{postDetail.date}</span>
            <FaRegCommentDots className="m-1"></FaRegCommentDots>
            <span className="m-1">{postDetail.comments.length}</span>
            <FaEye className="m-1"></FaEye>
            <span className="m-1">{postDetail.views}</span>
          </div>
          <Row className="mb-3">
            <CKEditor
              editor={BallonEditor}
              data={postDetail.contents}
              config={editorConfiguration}
              disabled="true"
            />
          </Row>
        </>
      ) : null}
    </>
  );
  return (
    <div>
      <Helmet title={`Post ${title}`} />
      {isLoading === true ? Spinner : Body}
    </div>
  );
};

export default PostDetail;
