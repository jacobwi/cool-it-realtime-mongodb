import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  position: fixed;
  top: 0;
  height: 100%;
  width: 8%;
  background-color: #181b26;
  grid-area: 1;
`;

const Menu = styled.ul`
  list-style-type: none;
  margin: 80px auto;
  padding: 0;
  line-height: 40px;
  & i {
    color: #5d626f;
    &:hover {
      color: white;
    }
  }
  & .active {
    & i {
      color: white;
      transition: color 300ms linear !important;
    }
  }
  & .setting-item {
    position: fixed;
    bottom: 0;
    left: 2.6%;
    text-align: center;
  }
`;

const MenuItem = styled.li`
  margin: 20px auto;
  text-align: center;
  font-size: 1.6em;
  color: white;
`;

export default class Sidemenu extends Component {
  state = { activeItem: "home" };

  handleItemClick = e => {
    this.setState({
      activeItem: e.target.id
    });
  };
  render() {
    const { activeItem } = this.state;
    return (
      <Container>
        <Menu>
          <MenuItem>
            <Link
              to="/"
              className={activeItem === "home" ? "active item" : "item"}
              onClick={this.handleItemClick}
              id="home"
            >
              <Icon name="home" id="home" />
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              to="/group"
              className={activeItem === "groups" ? "active item" : "item"}
              onClick={this.handleItemClick}
              id="groups"
            >
              <Icon name="pushed" id="groups" />
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              to="/message"
              className={activeItem === "message" ? "active item" : "item"}
              onClick={this.handleItemClick}
              id="message"
            >
              <Icon name="envelope outline" id="message" />
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              to="/"
              className={activeItem === "user" ? "active item" : "item"}
              onClick={this.handleItemClick}
              id="user"
            >
              <Icon name="user" id="user" />
            </Link>
          </MenuItem>

          <MenuItem className="setting-item">
            <Link
              to="/settings"
              className={activeItem === "setting" ? "active item" : "item"}
              onClick={this.handleItemClick}
              id="setting"
            >
              <Icon name="setting" id="setting" />
            </Link>
          </MenuItem>
        </Menu>
      </Container>
    );
  }
}
