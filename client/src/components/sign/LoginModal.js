import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  Modal,
  ModalBody,
  Alert,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
} from "reactstrap";
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from "../../redux/types";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const LoginModal = () => {
  const [modal, setModal] = useState(false);
  const [localMessage, setLocalMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { errorMassage } = useSelector((state) => state.login);
  useEffect(() => {
    try {
      setLocalMessage(errorMassage);
    } catch (e) {
      console.log(e);
    }
  }, [errorMassage]);
  const handleToggle = () => {
    dispatch({
      type: CLEAR_ERROR_REQUEST,
    });
    setModal(!modal);
  };
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    const user = { email, password };
    console.log(user);
    dispatch({
      type: LOGIN_REQUEST,
      payload: user,
    });
  };

  return (
    <div>
      <NavLink onClick={handleToggle} href="#">
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={handleToggle}>
        <div className="d-flex justify-content-center mt-3 mb-3">
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
        <div className="text-center mb-3">
          <strong style={{ fontSize: "28px" }}>로그인</strong>
        </div>
        <ModalBody>
          {localMessage ? <Alert color="danger">{localMessage}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label className="mb-2" for="email">
                <strong>Email</strong>
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="이메일을 입력하세요"
                onChange={onChange}
                className="mb-4"
              />
              <Label className="mb-2" for="password">
                <strong>Password</strong>
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="비밀번호를 입력하세요"
                onChange={onChange}
                className="mb-4"
              />
              <Button className="w-100" style={{ backgroundColor: "#1976d2" }}>
                <strong>로그인</strong>
              </Button>
            </FormGroup>
          </Form>
          <div className="mt-3">
            <Link to="#" className="col-md-3 text-decoration-none">
              <strong style={{ color: "#1976d2" }}>비밀번호 찾기</strong>
            </Link>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
