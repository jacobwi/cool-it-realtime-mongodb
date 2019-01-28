import React, { Component } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
export default class Favorites extends Component {
  render() {
    return (
      <div>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="star" /> FAVORITES
            </span>{" "}
          </Menu.Item>
        </Menu.Menu>
      </div>
    );
  }
}
