import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";

import { GameProvider } from './GameContext';

function App() {
  return (
    <>
      <GameProvider>
        <GlobalStyles />
        <Router>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/game">
            <Game/>
          </Route>
        </Router>
      </GameProvider>
    </>
  );
}

export default App;
