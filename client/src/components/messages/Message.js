import React from "react";
import moment from "moment";
import { Comment } from "semantic-ui-react";



const Message = ({ message, user }) => (
  <Comment>
    <Comment.Avatar src={user.avatar} />
    <Comment.Content>
      <Comment.Author as="a">{user.username}</Comment.Author>
      <Comment.Text>{message}</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default Message;
