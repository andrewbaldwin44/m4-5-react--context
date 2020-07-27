import React, { useState } from "react";
import usePersistedState from '../hooks/usePersistedState.hook';

import { items } from '../data';

const initialPurchased = items.reduce((purchasedItems, item) => {
  purchasedItems[item.id] = 0;
  return purchasedItems;
}, {});

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  const [cookieCount, setCookieCount] = usePersistedState('cookieCount', 1000);
  const [purchasedItems, setPurchasedItems] = useState(initialPurchased);

  return (
    <GameContext.Provider
      value={{
        cookieCount,
        setCookieCount,
        purchasedItems,
        setPurchasedItems
      }}
    >
      {children}
    </GameContext.Provider>

  );
};
