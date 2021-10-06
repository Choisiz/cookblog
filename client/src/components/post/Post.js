import React, { Fragment } from "react";
import PostSole from "./PostSole";

const Post = ({ posts }) => {
  return (
    <Fragment>
      {Array.isArray(posts)
        ? posts.map(
            ({ _id, title, fileUrl, views, comments, contents, bookmark }) => {
              let a = contents.replace(/(<([^>]+)>)/gi, ""); //태그저거
              let contentsRegEx = a.replace(/&nbsp;/gi, ""); //nasp제거
              const contentsOpen = <div className="mb-5">{contentsRegEx}</div>;
              const contentsClose = contentsRegEx.slice(0, 80) + "...";

              return (
                <PostSole
                  key={_id}
                  _id={_id}
                  title={title}
                  fileUrl={fileUrl}
                  views={views}
                  comments={comments}
                  contents={contents}
                  bookmark={bookmark}
                  contentsRegEx={contentsRegEx}
                  contentsOpen={contentsOpen}
                  contentsClose={contentsClose}
                />
              );
            }
          )
        : ""}
    </Fragment>
  );
};

export default Post;
