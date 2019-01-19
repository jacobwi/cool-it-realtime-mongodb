import React, { Component } from "react";
import styled from "styled-components";
import {
  Button,
  Header,
  Icon,
  Modal,
  Input,
  Image,
  List
} from "semantic-ui-react";
import axios from "axios";
import { connect } from "react-redux";
import { getGroups } from "../../actions";
const Main = styled.div`
  display: grid;

  grid-template-columns: 100px 1fr;
  height: 100%;
  width: 100%;

  & .group-list {
    border-right: 1px black solid;
    height: 600px;
  }
`;
class Group extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      groups: [],
      groupName: ""
    };
  }
  componentDidMount() {
    this.props.getGroups(this.props.authentication.user.username);

    this.setState({
      groups: this.props.groups.groups
    });
  }
  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });
  addGroup = () => {
    this.setState({
      open: false
    });
    let group = {
      name: "testd",
      username: this.props.authentication.user.username
    };
    axios
      .post("group/create", group)
      .then(res => console.log("complete"))
      .catch(err => console.log(err));
  };
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { open, dimmer, groups } = this.state;
    return (
      <Main>
        <div>
          {this.state.groups.length < 1 ? (
            <div className="group-list">
              <p>You are not in any group :(</p>

              <Button onClick={this.show("blurring")}>Blurring</Button>

              <Modal dimmer={dimmer} open={open} onClose={this.close}>
                <Modal.Header>Create Group</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <Header>Select a Group Name</Header>
                    <Input
                      icon="users"
                      iconPosition="left"
                      placeholder="Group name..."
                      name="groupName"
                      value={this.state.groupName}
                      onChange={this.onChange}
                    />
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="black" onClick={this.close}>
                    Nope
                  </Button>
                  <Button
                    positive
                    icon="checkmark"
                    labelPosition="right"
                    content="Yep, that's me"
                    onClick={this.addGroup}
                  />
                </Modal.Actions>
              </Modal>
            </div>
          ) : (
            <div>
              {groups &&
                groups.map((item, key) => (
                  <List divided verticalAlign="middle">
                    <List.Item>
                      <Image avatar src="/images/avatar/small/daniel.jpg" />
                      <List.Content>
                        <List.Header as="a">{item.name}</List.Header>
                      </List.Content>
                    </List.Item>
                  </List>
                ))}
            </div>
          )}
        </div>
        <div />
      </Main>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
  groups: state.groups
});

export default connect(
  mapStateToProps,
  { getGroups }
)(Group);
