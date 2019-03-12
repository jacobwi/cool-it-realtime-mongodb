import React from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { logout } from "../../actions";

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
    
    this.props.logout(this.props.history);
    
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
            <Image
              src={this.props.currentUser.avatar}
              size="big"
              circular
              style={{ padding: "10px" }}
            />
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

export default connect(
  mapStateToProps,
  { logout }
)(UserPanel);
