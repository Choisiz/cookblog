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
import { MdLockOutline } from "react-icons/md";

const Profile = () => {
  const { userId, errorMassage, successMassage, preMessage, allMassage } =
    useSelector((state) => state.login);
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
        <Card className="mt-5 mb-5">
          <CardHeader>
            <div className="d-flex justify-content-center mt-2 mb-3">
              <div
                style={{
                  backgroundColor: "#FFCA2C",
                  width: "45px",
                  height: "45px",
                  borderRadius: "25px",
                  textAlign: "center",
                }}
              >
                <MdLockOutline color="white" className="mt-2" size="30" />
              </div>
            </div>
            <div className="text-center">
              <strong style={{ fontSize: "25px" }}>개인정보 수정</strong>
            </div>
          </CardHeader>
          <CardBody>
            <Form onSubmit={onSubmit}>
              <FormGroup className="mb-2">
                <Label className="mb-2" for="title">
                  <strong>기존 비밀번호</strong>
                </Label>
                <Input
                  type="password"
                  name="prePassword"
                  id="prePassword"
                  className="form-control mb-4"
                  onChange={onChange}
                  placeholder="비밀번호를 입력하세요"
                />
                {preMessage ? <Alert color="danger">{preMessage}</Alert> : ""}
              </FormGroup>
              <FormGroup className="mb-2">
                <Label className="mb-2" for="title">
                  <strong>새 비밀번호</strong>
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control mb-4"
                  onChange={onChange}
                  placeholder="새 비밀번호를 입력하세요"
                />
              </FormGroup>
              <FormGroup>
                <Label className="mb-2" for="title">
                  <strong>새 비밀번호 확인</strong>
                </Label>
                <Input
                  type="password"
                  name="rePassword"
                  id="rePassword"
                  className="form-control mb-4"
                  onChange={onChange}
                  placeholder="다시 비밀번호를 입력하세요"
                />
                {errorMassage ? (
                  <Alert color="danger">{errorMassage}</Alert>
                ) : (
                  ""
                )}
              </FormGroup>
              <Button
                style={{ backgroundColor: "#1976d2" }}
                block
                className="mt-4 mb-4 w-100"
              >
                <strong>확인</strong>
              </Button>
              {allMassage ? <Alert color="warning">{allMassage}</Alert> : ""}
              {successMassage ? "" : <div></div>}
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Profile;
