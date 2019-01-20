import React from "react";
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { logout } from "../../actions";
import { withRouter } from "react-router-dom";
class UserPanel extends React.Component {
  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{this.props.currentUser.username}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={this.logout}>Sign Out</span>
    }
  ];
  logout = () => {
    console.log("logging out");
    this.props.logout();
    this.props.history.push("/login");
  };
  render() {
    return (
      <Grid style={{ background: "#181b26" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.6em", margin: 0 }}>
            <Header inverted floated="left" as="h2">
              <Icon name="chat" />
              <Header.Content>Foo Chat</Header.Content>
            </Header>
          </Grid.Row>

          <Header style={{ padding: "1em" }} as="h4" inverted>
            <Dropdown
              trigger={<span>{this.props.currentUser.fullname}</span>}
              options={this.dropdownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.authentication.user
});

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(UserPanel)
);
