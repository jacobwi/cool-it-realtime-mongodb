import React from "react";
import { Grid } from "semantic-ui-react";
import ColorPanel from "./colorpanel";
import Sidemenu from "./sidemenu";
import Messages from "./messages";

const App = () => (
  <Grid columns="equal" className="app" style={{ background: "#eee" }}>
    <ColorPanel />
    <Sidemenu />

    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages />
    </Grid.Column>

    <Grid.Column width={4}>Message </Grid.Column>
  </Grid>
);

export default App;
