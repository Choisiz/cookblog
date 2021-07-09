import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_LOADING_REQUEST } from "../../redux/types";
import { Helmet } from "react-helmet";
import { Row, Spinner } from "reactstrap";
import Spinners from "../../components/Spinners/Spinners";
import Post from "../../components/post/Post";
const PostCard = () => {
  const { posts } = useSelector((state) => state.post);
  console.log("posts", { posts });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: POST_LOADING_REQUEST,
    });
  }, [dispatch]);
  return (
    <>
      <Helmet title="Home" />
      <Row>{posts ? <Post posts={posts} /> : Spinners}</Row>
    </>
  );
};

export default PostCard;
