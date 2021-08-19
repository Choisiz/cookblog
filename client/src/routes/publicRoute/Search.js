import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row } from "reactstrap";
import Post from "../../components/post/Post";
import { SEARCH_REQUEST } from "../../redux/types";

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
    <div>
      <h1>검색결과: "{searchTerm}"</h1>
      <Row>
        <Post posts={searchResult} />
      </Row>
    </div>
  );
};

export default Search;
