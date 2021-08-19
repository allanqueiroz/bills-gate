import React from "react";
import "@fontsource/roboto";
import "./style.css";

import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

function App() {
  return (
    <div className="main-container">
      <h1>BILLS-NOT-THE-GATE</h1>
      <Button
        variant="contained"
        color="primary"
        startIcon={<DeleteIcon />}
        fullWidth={true}
      >
        Hello World
      </Button>
    </div>
  );
}

export default App;
