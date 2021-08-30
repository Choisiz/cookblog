import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Badge } from "reactstrap";

const Categroy = ({ posts }) => {
  return (
    <>
      {Array.isArray(posts)
        ? posts.map(({ _id, categoryName, posts }) => (
            <Fragment key={_id}>
              <Link to={`/post/category/${categoryName}`}>
                <Button color="warning" className="m-1">
                  # {categoryName}
                  <Badge>{posts.length}</Badge>
                </Button>
              </Link>
            </Fragment>
          ))
        : ""}
    </>
  );
};

export default Categroy;
