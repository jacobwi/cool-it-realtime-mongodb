import React from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import axios from "axios";
import { connect } from "react-redux";

class Groups extends React.Component {
  state = {
    groups: [],
    groupName: "",
    groupDetails: "",
    modal: false
  };

  componentDidMount() {
    if (this.props.currentUser._id) {
      this.getGroups(this.props.currentUser._id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser._id) {
      this.getGroups(nextProps.currentUser._id);
    }
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
      })
      .catch(err => console.log(err.response));
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
          groups: [...this.state.groups, res.data]
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
        onClick={() => console.log(group)}
        name={group.name}
        style={{ opacity: 0.7 }}
      >
        # {group.name}
      </Menu.Item>
    ));
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
          {this.displayChannels(groups)}
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
  currentUser: state.authentication.user
});

export default connect(mapStateToProps)(Groups);
