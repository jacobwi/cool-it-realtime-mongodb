import React from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

class Groups extends React.Component {
  state = {
    groups: [],
    groupName: "",
    groupDetails: "",
    modal: false
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
  };
  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

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

export default Groups;
