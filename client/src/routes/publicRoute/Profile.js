import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Helmet from "react-helmet";
import { CLEAR_ERROR_REQUEST, PASSWORD_EDIT_REQUEST } from "../../redux/types";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const Profile = () => {
  const { userId, errorMassage, successMassage, preMessage } = useSelector(
    (state) => state.login
  );
  const dispatch = useDispatch();
  const { userName } = useParams();
  const [form, setForm] = useState({
    previewPassword: "",
    password: "",
    rePassword: "",
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { prePassword, password, rePassword } = form;
    const token = localStorage.getItem("token");
    const body = {
      prePassword,
      password,
      rePassword,
      userId,
      userName,
      token,
    };
    dispatch({
      type: CLEAR_ERROR_REQUEST,
    });
    dispatch({
      type: PASSWORD_EDIT_REQUEST,
      payload: body,
    });
  };

  return (
    <>
      <Helmet title={`profile: ${userName} 프로필`} />
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Card>
          <CardHeader>
            <strong>비밀번호 수정</strong>
          </CardHeader>
          <CardBody>
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Label for="title">기존 비밀번호</Label>
                <Input
                  type="password"
                  name="prePassword"
                  id="prePassword"
                  className="form-control mb-2"
                  onChange={onChange}
                />
                {preMessage ? <Alert color="danger">{preMessage}</Alert> : ""}
              </FormGroup>
              <FormGroup>
                <Label for="title">새 비밀번호</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  onChange={onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="title">확인 비밀번호</Label>
                <Input
                  type="password"
                  name="rePassword"
                  id="rePassword"
                  className="form-control mb-2"
                  onChange={onChange}
                />
                {errorMassage ? (
                  <Alert color="danger">{errorMassage}</Alert>
                ) : (
                  ""
                )}
              </FormGroup>
              <Button
                color="success"
                block
                className="mt-4 mb-4 col-md-3 offset-9"
              >
                제출
              </Button>
              {successMassage ? (
                <Alert color="success">{successMassage}</Alert>
              ) : (
                ""
              )}
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Profile;
