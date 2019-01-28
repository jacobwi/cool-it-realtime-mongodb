import React from "react";
import UserPanel from "./UserPanel";
import { Menu } from "semantic-ui-react";
import Groups from "./Groups";
import { connect } from "react-redux";
import Favorites from "./Favorites";
class SidePanel extends React.Component {
  render() {
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: "#181b26", fontSize: "1.2rem" }}
      >
        <UserPanel />
        <Favorites />
        <Groups
          key={this.props.currentUser && this.props.currentUser._id}
          user={this.props.currentUser}
        />
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.authentication.user
});

export default connect(mapStateToProps)(SidePanel);
