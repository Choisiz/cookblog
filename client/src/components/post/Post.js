import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, CardTitle, Row } from "reactstrap";

const Post = ({ posts }) => {
  return (
    <Fragment>
      {Array.isArray(posts)
        ? posts.map(({ _id, title, fileUrl, views, comments, contents }) => {
            let contentsRegEx = contents.replace(/(<([^>]+)>)/gi, "");
            var check_num = /[0-9]/;
            var check_eng = /[a-zA-Z]/;
            const contentsOpen = <div className="mb-5">{contentsRegEx}</div>;
            const contentsClose = contentsRegEx.slice(0, 80) + "...";
            return (
              <div key={_id} className="col-md-4">
                <Link
                  to={`/post/${_id}`}
                  className="text-dark text-decoration-none"
                >
                  <Card className="mb-3 hello">
                    <CardImg top alt="이미지" src={fileUrl} />
                    <CardBody>
                      <CardTitle className="text-truncate d-flex justify-content-between">
                        <div className="p-1" style={{ fontSize: "28px" }}>
                          {title}
                        </div>
                      </CardTitle>
                      <Row className="p-1">
                        <div className="mb-3" style={{ fontSize: "16px" }}>
                          {contentsRegEx.length >= 48
                            ? contentsClose
                            : contentsOpen}
                        </div>
                        <div className="border-top">
                          <div className="mt-2">
                            <span
                              style={{ marginRight: "20px", fontSize: "12px" }}
                            >
                              조회 {views}회
                            </span>
                            <span style={{ fontSize: "12px" }}>
                              댓글 {comments.length}회
                            </span>
                          </div>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                </Link>
              </div>
            );
          })
        : ""}
    </Fragment>
  );
};

export default Post;
