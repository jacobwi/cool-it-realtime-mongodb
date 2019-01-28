import React from "react";
import { Segment, Button, Input, Icon } from "semantic-ui-react";
import styled from "styled-components";
import axios from "axios";
import uuid4 from "uuid4";
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
      isMessage: false,
      currentGroup: this.props.group,
      user: this.props.user,
      loading: false,
      file: "",
      isFile: false,

      uploadTask: null,
      uploadState: "",
      percentUploaded: 0
    };
  }
  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    if (!this.state.isFile) {
      let messageData = {
        group: this.state.currentGroup._id,
        body: this.state.message,
        author: this.state.user
      };
      axios
        .post("/message/post_message", messageData)
        .then(res =>
          this.setState({
            loading: false
          })
        )
        .catch(err => console.log(err));
    } else {
      this.uploadImage();
    }
  };
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });

    if (event.target.name === "message") {
      this.setState({
        isMessage: true
      });
    }

    if (event.target.value <= 0) {
      this.setState({
        isMessage: false
      });
    }
  };
  uploadImage = () => {
    const filePath = `group/public/${uuid4()}.jpg`;
    let messageData = {
      group: this.state.currentGroup._id,
      img: this.state.file,
      author: this.state.user
    };
    axios
      .post("/message/image", messageData)
      .then(res =>
        this.setState({
          loading: false
        })
      )
      .catch(err => console.log(err));
  };
  selectFile = event => {
    const file = event.target.files[0];
    console.log(file)
    if (file) {
      this.setState({ file, isFile: true, isMessage: true });
    }
  };
  render() {
    return (
      <Main>
        <Segment className="form">
          <Input
            fluid
            name="message"
            style={{ marginBottom: "0.7em" }}
            label={
              !this.state.file ? (
                <div>
                  <label htmlFor="hidden-new-file" className="ui icon button">
                    <Icon name="plus" />
                  </label>
                  <input
                    type="file"
                    id="hidden-new-file"
                    style={{ display: "none" }}
                    onChange={this.selectFile}
                  />
                </div>
              ) : (
                <div>
                  <label className="ui icon button">
                    <Icon
                      name="window close outline"
                      color="red"
                      onClick={this.removeFile}
                    />
                  </label>
                </div>
              )
            }
            labelPosition="left"
            placeholder={
              this.state.isFile ? "Image Uploaded" : "Write your message"
            }
            onChange={this.onChange}
            value={this.state.message}
            disabled={this.state.isFile ? true : false}
          />
          <Button.Group icon widths="2">
            <Button
              color="teal"
              content="Send"
              labelPosition="left"
              icon="edit"
              onClick={this.onSubmit}
              className={this.state.loading ? "loading" : ""}
              disabled={this.state.isMessage ? false : true}
            />
          </Button.Group>
        </Segment>
      </Main>
    );
  }
}
export default MessageForm;
