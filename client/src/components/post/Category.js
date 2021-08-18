import React from "react";
import { Link } from "react-router-dom";
import { Badge, Button } from "reactstrap";

const Category = ({ posts }) => {
  return (
    <div style={{ display: "flex" }}>
      {Array.isArray(posts)
        ? posts.map(({ _id, categoryName, posts }) => (
            <div key={_id} className="mx-1 mt-1 my_category">
              <Link
                to={`/post/category/${categoryName}`}
                className="text-dark text-decoration-none"
              >
                <span className="ml-1">
                  <Button color="info">
                    {categoryName} <Badge color="lighit">{posts.length}</Badge>
                  </Button>
                </span>
              </Link>
            </div>
          ))
        : ""}
    </div>
  );
};

export default Category;
