import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row } from "reactstrap";
import Post from "../../components/post/Post";
import { SEARCH_REQUEST } from "../../redux/types";
import { Helmet } from "react-helmet";
const Search = () => {
  const { searchResult } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  let { searchTerm } = useParams();

  useEffect(() => {
    if (searchTerm) {
      dispatch({
        type: SEARCH_REQUEST,
        payload: searchTerm,
      });
    }
  }, [dispatch, searchTerm]);

  return (
    <Fragment>
      <Helmet title={`검색결과: ${searchTerm}`} />
      <Row>
        <div className="border-top border-bottom py-2 mb-3">
          <span style={{ fontSize: "25px" }}>{searchTerm} </span>으로 검색한
          결과입니다.
        </div>
      </Row>
      <Row>
        <Post posts={searchResult} />
      </Row>
    </Fragment>
  );
};

export default Search;
