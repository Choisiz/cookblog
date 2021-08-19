import React, { useCallback, useEffect, useState } from "react";
import {
  Navbar,
  Container,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Form,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import LoginModal from "../components/sign/LoginModal";
import RegisterModal from "../components/sign/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_REQUEST, POST_WRITE_REQUEST } from "../redux/types";
import SearchInput from "./search/searchInput";

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, userRole } = useSelector(
    (state) => state.login
  );

  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    setIsOpen(false);
  }, [user]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addPostClick = () => {
    dispatch({
      type: POST_WRITE_REQUEST,
    });
  };

  const authLink = (
    <>
      <NavItem>
        {userRole === "MainOwner" ? (
          <Form>
            <Link
              to="/post"
              className="btn btn-sucess block text-white px-3"
              onClick={addPostClick}
            >
              Add Post
            </Link>
          </Form>
        ) : (
          ""
        )}
      </NavItem>
      <NavItem className="d-flex justify-conntent-center">
        <Form className="col mt-2">
          {user && user.name ? (
            <Link to={`/user/${user.name}/profile`}>
              <Button outline color="light" className="px-3" block>
                <strong>{user ? `Welcome ${user.name}` : ""}</strong>
              </Button>
            </Link>
          ) : (
            <Button outline color="light" className="px-3" block>
              <strong>유저가 존재하지 않습니다</strong>
            </Button>
          )}
        </Form>
      </NavItem>
      <NavItem>
        <Form className="col">
          <Link onClick={onLogout} tp="#">
            <Button outline color="light" className="mt-2" block>
              LogOut
            </Button>
          </Link>
        </Form>
      </NavItem>
    </>
  );

  const guestLink = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  );

  return (
    <>
      <Navbar color="dark" dark expand="lg" className="sticky-top">
        <Container>
          <Link to="/" className="text-white text-decoration-none">
            hello blog
          </Link>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <SearchInput isOpen={isOpen} />
            <Nav className="ml-auto d-felx justify-content-around" navbar>
              {isAuthenticated ? authLink : guestLink}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
