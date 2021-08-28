import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Row,
  Button,
  Badge,
} from "reactstrap";
import { FaEye } from "react-icons/fa";

const Post = ({ posts }) => {
  return (
    <>
      {Array.isArray(posts)
        ? posts.map(({ _id, title, fileUrl, views, comments }) => {
            return (
              <div key={_id} className="col-md-4">
                <Link
                  to={`/post/${_id}`}
                  className="text-dark text-decoration-none"
                >
                  <Card className="mb-3">
                    <CardImg top alt="이미지" src={fileUrl} />
                    <CardBody>
                      <CardTitle className="text-truncate d-flex justify-content-between">
                        <span className="text-truncate">{title}</span>
                        <span>
                          <FaEye></FaEye>
                          &nbsp;&nbsp;
                          <span>조회수: {views}</span>
                        </span>
                      </CardTitle>
                      <Row>
                        <Button color="primary" className="p-2 btn-block">
                          More
                          <Badge color="light">{comments.length}</Badge>
                        </Button>
                      </Row>
                    </CardBody>
                  </Card>
                </Link>
              </div>
            );
          })
        : ""}
    </>
  );
};

export default Post;
