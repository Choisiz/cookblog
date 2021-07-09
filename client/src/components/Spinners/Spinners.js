import React from "react";
import { Row, Spinner } from "reactstrap";

const Spinners = () => {
  return (
    <>
      <Row className="d-flex justify-content-center m-5">
        <Spinner type="grow" color="primary" />
      </Row>
    </>
  );
};

export default Spinners;
