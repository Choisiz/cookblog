import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_LOADING_REQUEST } from "../../redux/types";
import { Helmet } from "react-helmet";
import { Row, Spinner } from "reactstrap";
import Spinners from "../../components/Spinners/Spinners";
import Post from "../../components/post/Post";
import Category from "../../components/post/Category";
const PostCard = () => {
  const { posts, categoryFindResult, isLoading, postCount } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: POST_LOADING_REQUEST,
    });
  }, [dispatch]);

  return (
    <>
      <Helmet title="Home" />
      <Row className="border-bottom border-top border-primary py-2 mb-3">
        <Category posts={categoryFindResult} />
      </Row>
      <Row>{posts ? <Post posts={posts} /> : Spinners}</Row>
    </>
  );
};

export default PostCard;
