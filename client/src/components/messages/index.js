import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import Message from "./Message";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import styled from "styled-components";
import { connect } from "react-redux";
import axios from "axios";
import openSocket from 'socket.io-client';

const Main = styled.div`
  & .messages {
    height: 340px;
    overflow-y: scroll;
  }
`;
class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      messagesLoading: true,
      channel: this.props.currentChannel,
      user: this.props.currentUser
    };
  }
  componentDidMount() {
    const socket = openSocket('http://localhost:8080');
    socket.on('messages', data => {
      if (data.action === 'create') {
        this.setState({
          messages: [...this.state.messages, data.message]
        })
      }
    })
  }
  componentDidUpdate(nextProps) {
    if (nextProps.currentGroup !== this.props.currentGroup) {
      this.getMessages(this.props.currentGroup._id);
    }
  }
  getMessages = async id => {
    let req = {
      id
    };
    let json = await axios.post("/group/get_all_messages", req);

    this.setState({
      messages: json.data
    });

  };
  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message user={message.author} message={message.body} />
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

        <MessageForm />
      </Main>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.authentication.user,
  currentGroup: state.groups.currentGroup
});

export default connect(mapStateToProps)(Messages);
