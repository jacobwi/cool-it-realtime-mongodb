import React from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import axios from "axios";
import { connect } from "react-redux";
import { setCurrentGroup } from "../../actions";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8080");
class Groups extends React.Component {
  state = {
    groups: [],
    groupName: "",
    groupDetails: "",
    modal: false,
    user: this.props.user
  };
  componentDidMount() {
    if (this.state.user) {
      this.getGroups(this.state.user._id);
      socket.on("groups", data => {
        if (data.action === "create") {
          this.setState({
            groups: [...this.state.groups, data.group]
          });
        }
      });
    }
  }
  componentWillUnmount() {
    socket.off("groups", this.getGroups);
  }
  getGroups = id => {
    let req = {
      id
    };
    axios
      .post("/group/get_all", req)
      .then(res => {
        this.setState({
          groups: res.data
        });

        this.props.setCurrentGroup(this.state.groups[0]);
      })
      .catch(err => console.log(err));
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    let groupData = {
      name: this.state.groupName,
      details: this.state.groupDetails,
      createdBy: this.props.currentUser._id
    };
    axios
      .post("/group/create", groupData)
      .then(res =>
        this.setState({
          modal: false
        })
      )
      .catch(err => console.log(err));
  };
  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });
  displayChannels = groups =>
    groups.length > 0 &&
    groups.map(group => (
      <Menu.Item
        key={group._id}
        onClick={() => this.setGroup(group)}
        name={group.name}
        style={{ opacity: 0.7 }}
        active={group._id === this.props.currentGroup._id}
      >
        # {group.name}
      </Menu.Item>
    ));

  setGroup = group => this.props.setCurrentGroup(group);
  render() {
    const { groups, modal } = this.state;

    return (
      <div>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> GROUPS
            </span>{" "}
            ({groups.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {this.props.currentGroup && this.displayChannels(groups)}
        </Menu.Menu>
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <Input
                  fluid
                  label="Group Name"
                  name="groupName"
                  onChange={this.onChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About Group"
                  name="groupDetails"
                  onChange={this.onChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.onSubmit}>
              <Icon name="checkmark" /> Create
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.authentication.user,
  currentGroup: state.groups.currentGroup
});

export default connect(
  mapStateToProps,
  { setCurrentGroup }
)(Groups);
