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

import App from "./components/App";
import store from "./store";
import Login from "./components/login";
import tokenSetter from "./utils";
import { setUser } from "./actions";
import Loading from "./components/Loading";

class Root extends React.Component {
  componentDidMount() {
    console.log(this.props.isLoading);
    if (localStorage.jwtToken) {
      tokenSetter(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      this.props.setUser(decoded);
      this.props.history.push("/");
    } else {
      this.props.history.push("/login");
    }
  }
  render() {
    return this.props.isLoading ? (
      <Loading />
    ) : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
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
    { setUser }
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
