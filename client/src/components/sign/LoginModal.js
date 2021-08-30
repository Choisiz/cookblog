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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from "../../redux/types";
import { MdLockOutline } from "react-icons/md";
import { FaUser, FaLock } from "react-icons/fa";
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
        로그인
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
        <div className="text-center mb-5">
          <strong style={{ fontSize: "28px" }}>로그인</strong>
        </div>
        <ModalBody>
          {localMessage ? <Alert color="danger">{localMessage}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <FaUser size="24" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="이메일을 입력하세요"
                  onChange={onChange}
                  className="mb-4"
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <FaLock size="24" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                  onChange={onChange}
                  className="mb-4"
                />
              </InputGroup>
              <Button className="w-100" style={{ backgroundColor: "#1976d2" }}>
                <strong>로그인</strong>
              </Button>
            </FormGroup>
          </Form>
          <div className="mt-4 mb-2">
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
