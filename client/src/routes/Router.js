import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppNavbar from "../components/AppNavbar";
import { Container } from "reactstrap";
import { Redirect, Switch, Route } from "react-router-dom";
import PostCard from "./publicRoute/PostCard";
import PostWrite from "./publicRoute/PostWrite";
import PostDetail from "./publicRoute/PostDetail";
import Search from "./publicRoute/Search";
import Category from "./publicRoute/Category";
const MyRouter = () => {
  return (
    <>
      <AppNavbar />
      <Header />
      <Container id="main-body" className="col-md-8">
        <Switch>
          <Route path="/" exact component={PostCard} />
          <Route path="/post" exact component={PostWrite} />
          <Route path="/post/:id" exact component={PostDetail} />
          <Route
            path="/posts/category/:categoryName"
            exact
            component={Category}
          />
          <Route path="/search:searchTerm" exact component={Search} />
          <Redirect from="*" to="/" />
        </Switch>
      </Container>
      <Footer />
    </>
  );
};

export default MyRouter;
