import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Home from "./home";
import Group from "./group";

const Frame = styled.div`
  margin: 0;
  padding-right: 40px;
  padding-top: 20px;
  grid-column: 2;
`;

export default class Routes extends Component {
  render() {
    return (
      <Frame>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/group" component={Group} />
        </Switch>
      </Frame>
    );
  }
}
