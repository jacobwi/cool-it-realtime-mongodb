import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import jwt_decode from "jwt-decode";

import Layout from "./components/Layout";
import store from "./store";
import Login from "./components/login";
import tokenSetter from "./utils";
import { setUser, setLoader } from "./actions";
import Loading from "./components/Loading";
import Signup from "./components/signup";

class Root extends React.Component {
  componentWillMount() {
    if (localStorage.jwtToken) {
      tokenSetter(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      this.props.setUser(decoded);
      this.props.history.push("/");
    } else {
      this.props.setLoader(false);
      this.props.history.push("/login");
    }
  }
  render() {
    return this.props.isLoading ? (
      <Loading />
    ) : (
      <Switch>
        <Route exact path="/" component={Layout} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.authentication.isLoading
});

const RootWithAuth = withRouter(
  connect(
    mapStateToProps,
    { setUser, setLoader }
  )(Root)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.querySelector("#root")
);
