import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import usePersistedState from '../hooks/usePersistedState.hook';

import { items } from '../data';

const initialPurchased = items.reduce((purchasedItems, item) => {
  purchasedItems[item.id] = 0;
  return purchasedItems;
}, {});

function App(props) {
  const [cookieCount, setCookieCount] = usePersistedState('cookieCount', 1000);
  const [purchasedItems, setPurchasedItems] = useState(initialPurchased);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game
            cookieCount={cookieCount}
            setCookieCount={setCookieCount}
            purchasedItems={purchasedItems}
            setPurchasedItems={setPurchasedItems}
          />
        </Route>
      </Router>
    </>
  );
}

export default App;
