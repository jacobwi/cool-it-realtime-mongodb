import React from "react";
import UserPanel from "./UserPanel";
import { Menu } from "semantic-ui-react";
import Groups from "./Groups";

class SidePanel extends React.Component {
  render() {
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: "#181b26", fontSize: "1.2rem" }}
      >
        <UserPanel />
        <Groups />
      </Menu>
    );
  }
}

export default SidePanel;
