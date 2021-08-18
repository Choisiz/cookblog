import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { CATEGORY_FIND_REQUEST } from "../../redux/types";
import Post from "../../components/post/Post";
import { Row } from "reactstrap";

const CategoryResult = () => {
  const dispatch = useDispatch();
  //prams를 따로 떼올수 잇는
  let { categoryName } = useParams();
  const { categoryFindResult } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch({
      type: CATEGORY_FIND_REQUEST,
      payload: categoryName,
    });
  }, [dispatch, categoryName]);

  return (
    <div>
      <h1>Category: "{categoryName}"</h1>
      <Row>
        <Post posts={categoryFindResult.posts} />
      </Row>
    </div>
  );
};

export default CategoryResult;
