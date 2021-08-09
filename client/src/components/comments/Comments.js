import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, FormGroup, Input, Button, Row } from "reactstrap";
import {
  COMMENT_LOADING_REQUEST,
  COMMENT_UPLOAD_REQUEST,
} from "../../redux/types";

const Comments = ({ id, userName, userId }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ contents: "" });

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { contents } = form;
    const token = localStorage.getItem("token");
    const body = {
      contents,
      token,
      id,
      userId,
      userName,
    };
    dispatch({
      type: COMMENT_UPLOAD_REQUEST,
      payload: body,
    });
    resetForm.current.value = "";
    setForm("");
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = useRef(null);
  console.log("resetForm", resetForm);

  useEffect(() => {
    dispatch({
      type: COMMENT_LOADING_REQUEST,
      payload: id,
    });
  }, [dispatch, id]);
  return (
    <>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Row className="p-2">
            <div className="font-weight-bold m-1">댓글 작성</div>
            <div className="my-1"></div>
            <Input
              innerRef={resetForm}
              type="textarea"
              name="contents"
              id="contents"
              onChange={onChange}
              placeholder="댓글작성"
            />
            <Button
              color="primary"
              block
              className="mt-2 offset-md-10 col-md-2"
            >
              Submit
            </Button>
          </Row>
        </FormGroup>
      </Form>
    </>
  );
};

export default Comments;
