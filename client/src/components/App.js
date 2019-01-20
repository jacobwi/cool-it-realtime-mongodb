import React from "react";
import { Grid } from "semantic-ui-react";
import ColorPanel from "./colorpanel";
import Sidemenu from "./sidemenu";

const App = () => (
  <Grid columns="equal" className="app" style={{ background: "#eee" }}>
    <ColorPanel />
    <Sidemenu />

    <Grid.Column style={{ marginLeft: 320 }} />

    <Grid.Column width={4} />
  </Grid>
);

export default App;
