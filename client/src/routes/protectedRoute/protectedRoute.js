import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const EditRoute = ({ component: Component, ...rest }) => {
  const { userId } = useSelector((state) => state.login);
  const { creatorId } = useSelector((state) => state.post);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userId === creatorId) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export const ProfileRoute = ({ component: Component, ...rest }) => {
  const { userName } = useSelector((state) => state.login);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (props.match.params.userName === userName) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
