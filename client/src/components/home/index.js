import React, { Component } from "react";
import { Header, List, Image } from "semantic-ui-react";
import styled from "styled-components";

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  & .last_seen {
    grid-column: 2;
    grid-row: 2;
  }
`;

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header as="h2" icon="home" content="Welcome" />

        <Content>
          <div className="last_seen">
            <List>
              <List.Item>
                <Image
                  avatar
                  src="https://react.semantic-ui.com/images/avatar/small/rachel.png"
                />
                <List.Content>
                  <List.Header as="a">Rachel</List.Header>
                  <List.Description>
                    Last seen watching{" "}
                    <a>
                      <b>Arrested Development</b>
                    </a>{" "}
                    just now.
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <Image
                  avatar
                  src="https://react.semantic-ui.com/images/avatar/small/lindsay.png"
                />
                <List.Content>
                  <List.Header as="a">Lindsay</List.Header>
                  <List.Description>
                    Last seen watching{" "}
                    <a>
                      <b>Bob's Burgers</b>
                    </a>{" "}
                    10 hours ago.
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <Image
                  avatar
                  src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                />
                <List.Content>
                  <List.Header as="a">Matthew</List.Header>
                  <List.Description>
                    Last seen watching{" "}
                    <a>
                      <b>The Godfather Part 2</b>
                    </a>{" "}
                    yesterday.
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <Image
                  avatar
                  src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg"
                />
                <List.Content>
                  <List.Header as="a">Jenny Hess</List.Header>
                  <List.Description>
                    Last seen watching{" "}
                    <a>
                      <b>Twin Peaks</b>
                    </a>{" "}
                    3 days ago.
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <Image
                  avatar
                  src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg"
                />
                <List.Content>
                  <List.Header as="a">Veronika Ossi</List.Header>
                  <List.Description>
                    Has not watched anything recently
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
          </div>
        </Content>
      </div>
    );
  }
}
