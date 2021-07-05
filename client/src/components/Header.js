import React from "react";
import { Row, Col } from "reactstrap";
const Header = () => {
  return (
    <div id="page-header">
      <Row>
        <Col md="6" className="text-center m-auto">
          <h1>Read Blog</h1>
          <p>블로그입니다</p>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
