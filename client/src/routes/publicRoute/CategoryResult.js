import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { CATEGORY_FIND_REQUEST } from "../../redux/types";
import Post from "../../components/post/Post";
import { Row, Button } from "reactstrap";
import { Helmet } from "react-helmet";

const CategoryResult = () => {
  const dispatch = useDispatch();
  let { categoryName } = useParams();
  const { categoryFindResult } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch({
      type: CATEGORY_FIND_REQUEST,
      payload: categoryName,
    });
  }, [dispatch, categoryName]);
  return (
    <Fragment>
      <Helmet title={`${categoryName}`} />
      <Row>
        <div className="border-top border-bottom border-dark py-2 mb-3">
          <Button color="warning" className="m-1">
            # {categoryName}
          </Button>
        </div>
      </Row>
      <Row>
        <Post posts={categoryFindResult.posts} />
      </Row>
    </Fragment>
  );
};

export default CategoryResult;
