import React, { useState } from "react";
import usePersistedState from '../hooks/usePersistedState.hook';

import { items } from '../data';

const initialPurchased = items.reduce((purchasedItems, item) => {
  purchasedItems[item.id] = 0;
  return purchasedItems;
}, {});

const calculatePowerUps = (purchasedItems, clicker = false) => {
  return items.reduce((cookiesPerTick, item) => {
    if (item.clicker === clicker) {
      return cookiesPerTick += item.value * purchasedItems[item.id];
    } else return cookiesPerTick;
  }, 0);
};

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  const [cookieCount, setCookieCount] = usePersistedState('cookieCount', 1000);
  const [purchasedItems, setPurchasedItems] = useState(initialPurchased);

  const incrementCookies = () => {
    const clickValue = calculatePowerUps(purchasedItems, true);
    const defaultValue = 1;
    const cookieCountIncrement = clickValue > 0 ? clickValue : defaultValue;

    setCookieCount(cookieCount + cookieCountIncrement);
  }

  return (
    <GameContext.Provider
      value={{
        cookieCount,
        setCookieCount,
        purchasedItems,
        setPurchasedItems,
        incrementCookies,
        calculatePowerUps
      }}
    >
      {children}
    </GameContext.Provider>

  );
};
