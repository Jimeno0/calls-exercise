import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Tractor, Spacer, Typography } from "@aircall/tractor";

function App() {
  return (
    <div className="App">
      <Tractor injectStyle>
        <Spacer space="s">
          <Typography variant="displayM">Hello</Typography>
          <Typography variant="displayL">World</Typography>
        </Spacer>
      </Tractor>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
