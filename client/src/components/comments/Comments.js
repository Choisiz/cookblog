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
          <Row
            className="p-2 border-top"
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <div className="my-1"></div>
            <Input
              innerRef={resetForm}
              type="textarea"
              name="contents"
              id="contents"
              onChange={onChange}
              placeholder="여러분의 소중한 댓글을 입력해주세요"
              style={{ height: "80px" }}
            />
            <Button
              block
              className="mt-3 mb-3 offset-md-10"
              style={{
                backgroundColor: "#6BACCE",
                borderRadius: "20px",
                border: "0",
                width: "150px",
              }}
            >
              등록
            </Button>
          </Row>
        </FormGroup>
      </Form>
    </>
  );
};

export default Comments;
