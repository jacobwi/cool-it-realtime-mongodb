import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import Message from "./Message";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import styled from "styled-components";

import axios from "axios";
import openSocket from "socket.io-client";

const Main = styled.div`
  & .messages {
    height: 340px;
    overflow-y: scroll;
  }
`;
const socket = openSocket("http://localhost:8080");
class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      messagesLoading: true,
      group: this.props.group,
      user: this.props.user
    };
  }
  componentDidMount() {
    if (this.state.group) {
      this.getMessages(this.state.group._id);
    }
    socket.on("messages", data => {
      if (data.action === "create") {
        this.setState({
          messages: [...this.state.messages, data.message]
        });
      }
    });
  }
  componentWillUnmount() {
    socket.off();
    socket.removeListener("messages");
  }
  getMessages = async id => {
    let req = {
      id
    };
    let json = await axios.post("/message/get_all_messages", req);

    this.setState({
      messages: json.data
    });
  };
  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message._id}
        user={message.author}
        message={message.body}
        time={message.createdAt}
        extra={message}
      />
    ));
  render() {
    return (
      <Main>
        <MessagesHeader />

        <Segment>
          <Comment.Group className="messages">
            {this.displayMessages(this.state.messages)}
          </Comment.Group>
        </Segment>

        <MessageForm
          key={this.state.user && this.state.user._id}
          group={this.state.group}
          user={this.state.user}
        />
      </Main>
    );
  }
}

export default Messages;
