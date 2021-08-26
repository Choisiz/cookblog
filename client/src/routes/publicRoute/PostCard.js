import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_LOADING_REQUEST } from "../../redux/types";
import { Helmet } from "react-helmet";
import { Alert, Row } from "reactstrap";
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
      payload: 0,
    });
  }, [dispatch]);

  const skipNumberRef = useRef(0);
  const postCountRef = useRef(0);
  const endMsg = useRef(false);

  //남은포스트
  postCountRef.current = postCount - 6;
  const observer = useRef();

  const lastPostElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      //IntersectionObserver 감지역할

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          let remainPostCount = postCountRef.current - skipNumberRef.current;
          if (remainPostCount >= 0) {
            dispatch({
              type: POST_LOADING_REQUEST,
              payload: skipNumberRef.current + 6,
            });
            skipNumberRef.current += 6;
          } else {
            endMsg.current = true;
          }
        }
      });
      if (observer.current) {
        //단위별로 끈기위해서 일단 끈어주고
        observer.current.disconnect();
      }
      if (node) {
        console.log("node", node);
        //이후에 다시연결
        observer.current.observe(node);
      }
    },
    [dispatch, isLoading]
  );

  return (
    <>
      <Helmet title="Home" />
      <Row className="border-bottom border-top border-primary py-2 mb-3">
        <Category posts={categoryFindResult} />
      </Row>
      <Row>{posts ? <Post posts={posts} /> : Spinners}</Row>

      <div ref={lastPostElementRef}>{isLoading && Spinners}</div>
      {isLoading ? (
        ""
      ) : endMsg ? (
        <div>
          <Alert color="danger" className="text-center font-weight-bolder">
            더이상 포스트가 존재하지 않습니다
          </Alert>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PostCard;
