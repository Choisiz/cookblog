import React, { Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppNavbar from "../components/AppNavbar";
import { Container } from "reactstrap";
import { Redirect, Switch, Route } from "react-router-dom";
import PostCard from "./publicRoute/PostCard";
import PostWrite from "./publicRoute/PostWrite";
import PostDetail from "./publicRoute/PostDetail";
import Search from "./publicRoute/Search";
import CategoryResult from "./publicRoute/CategoryResult";
import { EditRoute, ProfileRoute } from "./protectedRoute/protectedRoute";
import PostEdit from "./publicRoute/PostEdit";
import Profile from "./publicRoute/Profile";

const MyRouter = () => {
  return (
    <Fragment>
      <AppNavbar />
      <Header />
      <Container id="main-body">
        <Switch>
          <Route path="/" exact component={PostCard} />
          <Route path="/post" exact component={PostWrite} />
          <Route path="/post/:id" exact component={PostDetail} />
          <EditRoute path="/post/:id/edit" exact component={PostEdit} />
          <Route
            path="/post/category/:categoryName"
            exact
            component={CategoryResult}
          />
          <Route path="/search/:searchTerm" exact component={Search} />
          <ProfileRoute
            path="/user/:userName/profile"
            exact
            component={Profile}
          />
          <Redirect from="*" to="/" />
        </Switch>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default MyRouter;
