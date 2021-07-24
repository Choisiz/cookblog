import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "react-helmet";
import { Button, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

import CKEditor from "@ckeditor/ckeditor5-react";
import {
  POST_DELETE_REQUEST,
  POST_DETAIL_REQUEST,
  USER_LOADING_REQUEST,
} from "../../redux/types";
const PostDetail = (req) => {
  const dispatch = useDispatch();
  const { PostDetail, creatorId, title, loading } = useSelector(
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
        <Col className="col-md-3 mr-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            Home
          </Link>
        </Col>
        <Col className="col-md-3 mr-md-3">
          <Link
            to={`/post/${req.match.params.id}/edit`}
            className="btn btn-success btn-block"
          >
            Edit post
          </Link>
        </Col>
        <Col className="col-md-3">
          <Button className="btn-block btn-danger" onClick={onDeleteClick}>
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
  return <div>PostDetail</div>;
};

export default PostDetail;
