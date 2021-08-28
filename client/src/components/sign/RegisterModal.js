import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  Modal,
  ModalBody,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { CLEAR_ERROR_REQUEST, REGISTER_REQUEST } from "../../redux/types";
import { MdLockOutline } from "react-icons/md";

const RegisterModal = () => {
  const [modal, setModal] = useState(false);
  const [localMessage, setLocalMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
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
    const { name, email, password } = form;
    const newUser = { name, email, password };
    dispatch({
      type: REGISTER_REQUEST,
      payload: newUser,
    });
  };

  return (
    <div>
      <NavLink onClick={handleToggle} href="#">
        Register
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
          <strong style={{ fontSize: "28px" }}>회원가입</strong>
        </div>
        <ModalBody>
          {localMessage ? <Alert color="danger">{localMessage}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label className="mb-2" for="password">
                <strong>Name</strong>
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="이름"
                onChange={onChange}
                className="mb-3"
              />
              <Label className="mb-2" for="password">
                <strong>Email</strong>
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChange}
                className="mb-3"
              />
              <Label className="mb-2" for="password">
                <strong>Password</strong>
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChange}
                className="mb-4"
              />
              <Button className="w-100" style={{ backgroundColor: "#1976d2" }}>
                <strong>회원가입</strong>
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default RegisterModal;
