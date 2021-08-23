import React from "react";
import "@fontsource/roboto";
import "./style.css";
import { BrowserRouter, Route } from "react-router-dom";
import Main from "./pages/Main";
import Create from "./pages/Create";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact={true}>
        <Main />
      </Route>
      <Route path="/Create">
        <Create />
      </Route>
    </BrowserRouter>
  );
}

export default App;
