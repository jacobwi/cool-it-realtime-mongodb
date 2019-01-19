import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";

import Sidemenu from "./sidemenu";
import LandingRoutes from "./LandingRoutes";
import Routes from "./Routes";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  body {
    outline: none;
    width: 100%;
    height: 100%;
    overflow-x: hidden !important;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -ms-overflow-style: scrollbar;
    -webkit-app-region: drag;
    font-family: "Avenir Next", "Avenir", sans-serif;
  }
`;

const Main = styled.div`
  height: 100%;
  width: 100%;
`;
const Content = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 140px;
  height: 100%;
  width: 100%;
`;

class Layout extends Component {
  render() {
    return (
      <Main>
        <GlobalStyle />
        {this.props.authentication.isAuthenticated ? (
          <Content>
            <Sidemenu />
            <Routes />
          </Content>
        ) : (
          <Router>
            <LandingRoutes />
          </Router>
        )}
      </Main>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication
});

export default connect(mapStateToProps)(Layout);
