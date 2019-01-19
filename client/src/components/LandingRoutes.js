import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Landing from "./landing";
import Login from "./landing/login";

const Frame = styled.div`
  height: 100%;
  width: 100%;
`;

export default class LandingRoutes extends Component {
  render() {
    return (
      <Frame>
        <Switch>
          <Route exact path="/login" component={Landing} />
          <Route path="/" component={Login} />
        </Switch>
      </Frame>
    );
  }
}
