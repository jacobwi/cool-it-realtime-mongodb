import React from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import styled from "styled-components";
import { connect } from "react-redux";
import axios from "axios";

const Main = styled.div`
  & .form {
    position: fixed !important;
    bottom: 1em;
    margin-left: 320px !important;
    left: 0;
    right: 1em;
  }
`;
class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      currentGroup: "",
      loading: false
    };
  }
  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    let result;
    let messageData = {
      group: this.props.currentGroup._id,
      body: this.state.message,
      author: this.props.currentUser
    };
    axios
      .post("/group/post_message", messageData)
      .then(res =>

        this.setState({

          loading: false
        })
      )
      .catch(err => console.log(err));
  };
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <Main>
        <Segment className="form">
          <Input
            fluid
            name="message"
            style={{ marginBottom: "0.7em" }}
            label={<Button icon={"add"} />}
            labelPosition="left"
            placeholder="Write your message"
            onChange={this.onChange}
          />
          <Button.Group icon widths="2">
            <Button
              color="orange"
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              onClick={this.onSubmit}
              className={this.state.loading ? "loading" : ""}
            />
            <Button
              color="teal"
              content="Upload Media"
              labelPosition="right"
              icon="cloud upload"
            />
          </Button.Group>
        </Segment>
      </Main>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.authentication.user,
  currentGroup: state.groups.currentGroup
});

export default connect(mapStateToProps)(MessageForm);
